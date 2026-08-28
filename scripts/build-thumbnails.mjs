/**
 * cards.ts 의 thumbnail 원본을 받아 WebP 파생본을 만들고 R2 에 올린다.
 *
 *   node scripts/build-thumbnails.mjs --dry-run        # 무엇을 만들지만 확인
 *   node scripts/build-thumbnails.mjs --local-only     # .thumbnails/ 에만 생성, 업로드 안 함
 *   node scripts/build-thumbnails.mjs                  # 생성 + 업로드(이미 있으면 건너뜀)
 *   node scripts/build-thumbnails.mjs --force          # 이미 있어도 다시 올림
 *   node scripts/build-thumbnails.mjs --fix-originals  # 원본에 Cache-Control 만 다시 씌움
 *
 * 필요한 환경변수(.env.local):
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
 */
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import {
  DERIVED_CACHE_CONTROL,
  OG_BACKGROUND,
  OG_HEIGHT,
  OG_PREFIX,
  OG_QUALITY,
  OG_WIDTH,
  ORIGINAL_CACHE_CONTROL,
  PASSTHROUGH_EXTENSIONS,
  THUMBNAIL_PREFIX,
  THUMBNAIL_WIDTHS,
  WEBP_QUALITY,
  toDerivedKey,
  toOgKey,
} from './thumbnail.config.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CARDS_FILE = join(ROOT, 'src/data/cards.ts');
const RESTAURANTS_FILE = join(ROOT, 'src/data/restaurants.ts');
const LOCAL_OUT = join(ROOT, '.thumbnails');
const CONCURRENCY = 6;

const flags = new Set(process.argv.slice(2));
const isDryRun = flags.has('--dry-run');
const isLocalOnly = flags.has('--local-only');
const isForce = flags.has('--force');
const isFixOriginals = flags.has('--fix-originals');

const kb = bytes => `${(bytes / 1024).toFixed(1)} KB`;
const mb = bytes => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const extensionOf = url => (new URL(url).pathname.split('.').pop() ?? '').toLowerCase();

/**
 * 데이터 파일을 텍스트로 읽어 이미지 URL 을 뽑는다. 빌드 산출물에 의존하지 않기 위해 정규식으로 처리.
 * cards.ts 의 thumbnail 과 restaurants.ts 의 image 를 함께 모은다.
 */
async function readThumbnailUrls() {
  const source = await readFile(CARDS_FILE, 'utf8');
  const urls = [...source.matchAll(/thumbnail:\s*'([^']+)'/g)].map(match => match[1]);

  if (urls.length === 0) {
    throw new Error(`${CARDS_FILE} 에서 thumbnail URL 을 찾지 못했습니다.`);
  }

  const restaurantSource = await readFile(RESTAURANTS_FILE, 'utf8');
  // 밥집 사진은 아직 한 장도 없을 수 있으므로 비어 있어도 에러로 보지 않는다.
  const restaurantUrls = [...restaurantSource.matchAll(/image:\s*'([^']+)'/g)].map(
    match => match[1]
  );

  return [...new Set([...urls, ...restaurantUrls])];
}

function createR2Client() {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
  const missing = Object.entries({
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `환경변수가 없습니다: ${missing.join(', ')}\n` +
        `.env.local 에 채운 뒤 다시 실행하거나, --local-only 로 생성만 해보세요.`
    );
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  return { client, bucket: R2_BUCKET };
}

async function existsInBucket(r2, key) {
  try {
    await r2.client.send(new HeadObjectCommand({ Bucket: r2.bucket, Key: key }));
    return true;
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404 || error?.name === 'NotFound') return false;
    throw error;
  }
}

async function upload(r2, key, body, contentType, cacheControl) {
  await r2.client.send(
    new PutObjectCommand({
      Bucket: r2.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    })
  );
}

/** 원본 1장을 받아 폭별 WebP 로 변환한다. 원본보다 큰 폭으로는 확대하지 않는다. */
async function buildVariants(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`다운로드 실패 ${response.status}: ${url}`);

  const original = Buffer.from(await response.arrayBuffer());
  const { width: sourceWidth } = await sharp(original).metadata();

  const variants = [];
  let lastWidth = 0;

  for (const width of THUMBNAIL_WIDTHS) {
    // 원본이 목표 폭보다 작으면 확대 대신 원본 크기로 만든다.
    const targetWidth = Math.min(width, sourceWidth);
    // 직전 폭과 결과가 같아지면(= 이미 원본 크기에 도달) 같은 파일을 또 만들지 않는다.
    if (targetWidth === lastWidth) continue;
    lastWidth = targetWidth;

    const body = await sharp(original)
      .resize(targetWidth, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    variants.push({
      key: toDerivedKey(url, width),
      body,
      contentType: 'image/webp',
      label: `${targetWidth}px`,
    });
  }

  // SNS 공유용 OG 이미지. 투명 배경을 흰색으로 합성한 1.91:1 JPEG.
  const ogBody = await sharp(original)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'contain', background: OG_BACKGROUND })
    .flatten({ background: OG_BACKGROUND })
    .jpeg({ quality: OG_QUALITY, mozjpeg: true })
    .toBuffer();

  variants.push({ key: toOgKey(url), body: ogBody, contentType: 'image/jpeg', label: 'og' });

  return { originalSize: original.length, sourceWidth, variants };
}

/** 작업 목록을 CONCURRENCY 만큼 동시에 굴린다. */
async function runPool(items, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

async function fixOriginals(urls, r2) {
  console.log(`원본 ${urls.length}장에 Cache-Control 을 다시 씌웁니다.\n`);

  await runPool(urls, async url => {
    const key = decodeURIComponent(new URL(url).pathname.slice(1));
    const response = await fetch(url);
    const body = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') ?? 'application/octet-stream';

    if (isDryRun) {
      console.log(`  [dry-run] ${key} (${kb(body.length)})`);
      return;
    }
    await upload(r2, key, body, contentType, ORIGINAL_CACHE_CONTROL);
    console.log(`  OK ${key}`);
  });
}

async function main() {
  const urls = await readThumbnailUrls();
  const passthrough = urls.filter(url => PASSTHROUGH_EXTENSIONS.includes(extensionOf(url)));
  const targets = urls.filter(url => !PASSTHROUGH_EXTENSIONS.includes(extensionOf(url)));

  console.log(`썸네일 ${urls.length}장 중 ${targets.length}장을 변환합니다.`);
  if (passthrough.length > 0) {
    const names = passthrough.map(url => url.split('/').pop()).join(', ');
    console.log(`원본 그대로 사용(${PASSTHROUGH_EXTENSIONS.join('/')}): ${names}`);
  }
  console.log(`폭: ${THUMBNAIL_WIDTHS.join(', ')}px / WebP q${WEBP_QUALITY}\n`);

  const needsR2 = (!isLocalOnly && !isDryRun) || isFixOriginals;
  const r2 = needsR2 ? createR2Client() : null;

  if (isFixOriginals) {
    await fixOriginals(urls, r2);
    return;
  }

  if (isLocalOnly) {
    await mkdir(join(LOCAL_OUT, THUMBNAIL_PREFIX), { recursive: true });
    await mkdir(join(LOCAL_OUT, OG_PREFIX), { recursive: true });
  }

  let originalTotal = 0;
  let derivedTotal = 0;
  let written = 0;
  let skipped = 0;
  const failures = [];

  await runPool(targets, async (url, index) => {
    const label = `[${String(index + 1).padStart(3)}/${targets.length}]`;
    const name = url.split('/').pop();

    try {
      const { originalSize, sourceWidth, variants } = await buildVariants(url);
      originalTotal += originalSize;

      const parts = [];
      for (const { key, body, contentType, label } of variants) {
        derivedTotal += body.length;
        parts.push(`${label} ${kb(body.length)}`);

        if (isDryRun) continue;

        if (isLocalOnly) {
          await writeFile(join(LOCAL_OUT, key), body);
          written++;
          continue;
        }

        if (!isForce && (await existsInBucket(r2, key))) {
          skipped++;
          continue;
        }
        await upload(r2, key, body, contentType, DERIVED_CACHE_CONTROL);
        written++;
      }

      console.log(
        `${label} ${name} (${sourceWidth}px ${kb(originalSize)}) -> ${parts.join(' / ')}`
      );
    } catch (error) {
      failures.push({ name, message: error.message });
      console.error(`${label} FAIL ${name}: ${error.message}`);
    }
  });

  console.log(`\n원본 합계   ${mb(originalTotal)}`);
  console.log(`파생본 합계 ${mb(derivedTotal)}`);
  if (originalTotal > 0) {
    console.log(`감소율      ${(100 - (derivedTotal / originalTotal) * 100).toFixed(1)}%`);
  }

  if (isDryRun) console.log('\n--dry-run 이라 아무것도 쓰지 않았습니다.');
  else if (isLocalOnly) console.log(`\n${LOCAL_OUT} 에 ${written}개 생성.`);
  else console.log(`\n업로드 ${written}개, 이미 있어 건너뜀 ${skipped}개.`);

  if (failures.length > 0) {
    console.error(`\n실패 ${failures.length}건:`);
    failures.forEach(failure => console.error(`  ${failure.name}: ${failure.message}`));
    process.exitCode = 1;
  }
}

main().catch(error => {
  console.error(`\n${error.message}`);
  process.exit(1);
});

/**
 * next/image 커스텀 로더.
 *
 * Vercel 이미지 최적화를 쓰지 않고, scripts/build-thumbnails.mjs 가 미리 만들어
 * R2 에 올려둔 WebP 파생본 URL 을 가리킨다. 런타임 변환이 없으므로 변환 비용이 들지 않는다.
 *
 * 폭을 바꾸려면 scripts/thumbnail.config.mjs 의 THUMBNAIL_WIDTHS 도 같이 수정하고
 * 스크립트를 다시 돌려야 한다.
 */

/** 미리 생성해 둔 파생본 폭. scripts/thumbnail.config.mjs 와 반드시 일치해야 한다. */
const THUMBNAIL_WIDTHS = [640, 960];

/** 파생본이 없어 원본을 그대로 내보내는 확장자. gif 는 애니메이션이라 변환하지 않는다. */
const PASSTHROUGH_PATTERN = /\.(gif|svg)$/i;

interface ImageLoaderParams {
  src: string;
  width: number;
}

export default function r2ImageLoader({ src, width }: ImageLoaderParams): string {
  // 로컬 이미지(public/, static import)는 파생본이 없으므로 그대로 둔다.
  if (!src.startsWith('http')) return src;
  if (PASSTHROUGH_PATTERN.test(src)) return src;

  // 요청된 폭을 실제로 존재하는 파생본 폭으로 올림해서 맞춘다.
  const target = THUMBNAIL_WIDTHS.find(candidate => candidate >= width) ?? THUMBNAIL_WIDTHS.at(-1);

  // https://host/mark.png -> https://host/thumb/mark_640.webp
  return src.replace(/\/([^/]+)\.[^./]+$/, `/thumb/$1_${target}.webp`);
}

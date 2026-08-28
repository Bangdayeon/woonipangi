/**
 * 썸네일 파생본 생성 규칙.
 * 이 값을 바꾸면 스크립트와 next/image 로더가 함께 따라가야 하므로
 * src/shared/lib/imageLoader.ts 의 THUMBNAIL_WIDTHS 도 같이 수정할 것.
 */

/**
 * 생성할 폭(px). 실제 렌더 크기 기준으로 산정했다.
 * - 목록 카드: 컨테이너 1200px / 6컬럼 → 약 187px, 이미지는 그 90%인 약 168px → DPR 3까지 640px
 * - 상세 페이지: h-80 + object-contain → 320px → DPR 3까지 960px
 */
export const THUMBNAIL_WIDTHS = [640, 960];

/** 파생본이 올라갈 버킷 내 접두사. 원본과 섞이지 않도록 분리한다. */
export const THUMBNAIL_PREFIX = 'thumb';

/** WebP 품질. 80이면 마스코트 일러스트 기준 눈에 띄는 열화 없이 90% 이상 줄어든다. */
export const WEBP_QUALITY = 80;

/**
 * 파생본을 만들지 않고 원본을 그대로 쓰는 확장자.
 * gif 는 애니메이션(loading_pang.gif = 24x24, 17프레임)이라 정적 webp 로 바꾸면 깨진다.
 */
export const PASSTHROUGH_EXTENSIONS = ['gif', 'svg'];

/** 파생본은 내용이 고정이고 파일명에 폭이 박혀 있으므로 영구 캐시해도 안전하다. */
export const DERIVED_CACHE_CONTROL = 'public, max-age=31536000, immutable';

/** 원본(다운로드용)은 교체 가능성이 있어 하루 캐시 + 재검증으로 둔다. */
export const ORIGINAL_CACHE_CONTROL = 'public, max-age=86400, stale-while-revalidate=604800';

/**
 * OG 이미지 규격.
 *
 * 썸네일과 달리 WebP 가 아니라 JPEG 로 만든다. 카카오톡을 비롯한 일부 SNS 크롤러가
 * WebP OG 이미지를 렌더하지 못하는 사례가 있어, 호환성이 확실한 포맷을 쓴다.
 * 또 원본 PNG 는 투명 배경이라 크롤러에 따라 검게 나오므로 흰 배경으로 합성한다.
 * 비율은 루트 레이아웃의 og-image.png 와 같은 1.91:1 로 맞춰 잘림을 피한다.
 */
export const OG_PREFIX = 'og';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const OG_BACKGROUND = { r: 255, g: 255, b: 255 };
export const OG_QUALITY = 82;

/** 원본 파일명에서 확장자를 뗀 이름. 파생본 경로의 공통 조각이다. */
function toBaseName(originalUrl) {
  const fileName = new URL(originalUrl).pathname.split('/').pop();
  return fileName.replace(/\.[^.]+$/, '');
}

/** 원본 URL → 썸네일 파생본 키. 로더와 스크립트가 공유한다. */
export function toDerivedKey(originalUrl, width) {
  return `${THUMBNAIL_PREFIX}/${toBaseName(originalUrl)}_${width}.webp`;
}

/** 원본 URL → OG 파생본 키. src/shared/lib/ogImage.ts 와 규칙이 같아야 한다. */
export function toOgKey(originalUrl) {
  return `${OG_PREFIX}/${toBaseName(originalUrl)}_og.jpg`;
}

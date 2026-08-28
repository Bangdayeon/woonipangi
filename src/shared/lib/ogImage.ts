/**
 * SNS 공유용 OG 이미지 URL 계산.
 *
 * scripts/build-thumbnails.mjs 가 원본마다 만들어 R2 에 올려둔 1200x630 JPEG 를 가리킨다.
 * 경로 규칙은 scripts/thumbnail.config.mjs 의 toOgKey 와 반드시 일치해야 한다.
 */

/** 루트 레이아웃과 동일한 OG 규격. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/** OG 파생본이 없는 확장자. 이 경우 사이트 기본 OG 이미지로 넘어간다. */
const PASSTHROUGH_PATTERN = /\.(gif|svg)$/i;

/** 파생본이 없을 때 쓰는 사이트 기본 OG 이미지. */
const FALLBACK_OG_IMAGE = '/og-image.png';

/**
 * 썸네일 원본 URL 을 OG 이미지 URL 로 바꾼다.
 * 파생본을 만들지 않는 원본(애니메이션 GIF 등)이면 사이트 기본 이미지를 돌려준다.
 *
 * https://host/mark.png -> https://host/og/mark_og.jpg
 */
export function toOgImageUrl(thumbnailUrl: string): string {
  if (!thumbnailUrl.startsWith('http')) return FALLBACK_OG_IMAGE;
  if (PASSTHROUGH_PATTERN.test(thumbnailUrl)) return FALLBACK_OG_IMAGE;

  return thumbnailUrl.replace(/\/([^/]+)\.[^./]+$/, '/og/$1_og.jpg');
}

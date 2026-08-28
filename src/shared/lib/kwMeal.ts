import type { MealCorner, MealDay, MealWeek } from '@/types/meal.types';

/** 광운대 식단안내 페이지. 서버 렌더링 HTML이라 별도 API 없이 파싱한다. */
export const KW_MEAL_URL = 'https://www.kw.ac.kr/ko/life/facility11.jsp';

/** 식단은 주 1회만 갱신되므로 1시간이면 충분하다. */
export const MEAL_REVALIDATE_SECONDS = 3600;

/**
 * 학교 WAF 가 UA 에 민감하다. curl 기본 UA 는 400 을 뱉는다.
 * Node fetch 는 통과하는 편이지만 명시해 두는 편이 안전하다.
 */
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/** 학교 서버가 느릴 때 라우트 전체가 매달리지 않도록 */
const FETCH_TIMEOUT_MS = 8_000;

const stripTags = (value: string) => value.replace(/<[^>]*>/g, '');

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&');

/** <pre> 셀 하나를 메뉴 줄 배열로. 원본에 후행 공백이 있어 줄마다 trim 이 필요하다. */
const toMenuLines = (cell: string) =>
  decodeEntities(stripTags(cell))
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

const firstMatch = (source: string, pattern: RegExp) => (source.match(pattern)?.[1] ?? '').trim();

/**
 * 식단안내 페이지 HTML 을 파싱한다.
 *
 * 순수 함수로 분리해 둔 이유는 저장한 HTML 픽스처만으로 네트워크 없이 검증하기 위해서다.
 * 마크업이 바뀌면 조용히 빈 값을 내지 않고 throw 한다. 빈 결과는 "오늘 메뉴 없음"으로
 * 영원히 렌더되지만, throw 는 502 로 드러나 Sentry 에 잡힌다.
 */
export function parseWeeklyMeal(html: string): MealWeek {
  // 조회기간은 원본에서 줄바꿈+탭을 사이에 두고 갈라져 있다.
  const period = html.match(
    /조회기간\s*:\s*(\d{4}-\d{2}-\d{2})[\s\S]{0,120}?~\s*(\d{4}-\d{2}-\d{2})/
  );

  const place =
    decodeEntities(firstMatch(html, /<h3>\s*(함지마루[^<]*)<\/h3>/)) || '함지마루(복지관 학생식당)';

  // 페이지에 dietData tbody 는 정확히 하나다.
  const tbody = html.match(/<tbody class="dietData">([\s\S]*?)<\/tbody>/)?.[1];
  const dates = [...html.matchAll(/<span class="nowDate">\s*([\d-]+)\s*<\/span>/g)].map(m => m[1]);
  const days = [...html.matchAll(/<span class="nowDay">\s*([^<]+?)\s*<\/span>/g)].map(m => m[1]);

  if (!tbody || dates.length === 0) {
    throw new Error('KW meal markup changed: dietData table not found');
  }

  const rows = [...tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(m => m[1]);

  const corners = rows.map(row => {
    const title = decodeEntities(firstMatch(row, /class="dietTitle">\s*([^<]*?)\s*</));
    return {
      title,
      // '광운대 함지마루천원의 아침' -> '천원의 아침' (천원 앞에는 공백이 없다)
      label: title.replace(/^광운대\s*함지마루\s*/, '').trim() || title,
      price: firstMatch(row, /class="dietPrice">\s*\(?\s*([^)<]*?)\s*\)?\s*</),
      time: firstMatch(row, /class="dietTime">\s*([^<]*?)\s*</),
      cells: [...row.matchAll(/<pre>([\s\S]*?)<\/pre>/g)].map(m => toMenuLines(m[1])),
    };
  });

  const mealDays: MealDay[] = dates.map((date, index) => ({
    date,
    day: days[index] ?? '',
    corners: corners.map<MealCorner>(({ title, label, price, time, cells }) => ({
      title,
      label,
      price,
      time,
      menu: cells[index] ?? [],
    })),
  }));

  return {
    from: period?.[1] ?? dates[0],
    to: period?.[2] ?? dates[dates.length - 1],
    place,
    days: mealDays,
    sourceUrl: KW_MEAL_URL,
    fetchedAt: new Date().toISOString(),
  };
}

/** 학교 페이지를 받아 파싱한다. Next 의 Data Cache 가 1시간 TTL 을 담당한다. */
export async function fetchWeeklyMeal(): Promise<MealWeek> {
  const response = await fetch(KW_MEAL_URL, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept-Language': 'ko-KR,ko;q=0.9',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    next: { revalidate: MEAL_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`KW responded ${response.status}`);
  }

  // Content-Type 이 charset=UTF-8 이라 text() 로 바로 안전하다.
  return parseWeeklyMeal(await response.text());
}

import { CATEGORIES, Category, LOCATIONS, Location } from '@/data/restaurants';

/** 필터 UI가 그리는 축. 값 배열은 데이터 정의(restaurants.ts)를 그대로 따른다. */
export const FILTER_GROUPS = [
  { key: 'category', label: '종류', options: CATEGORIES },
  { key: 'location', label: '위치', options: LOCATIONS },
] as const;

const VALID_CATEGORIES: ReadonlySet<string> = new Set(CATEGORIES);
const VALID_LOCATIONS: ReadonlySet<string> = new Set(LOCATIONS);

export function isValidCategory(value: string): value is Category {
  return VALID_CATEGORIES.has(value);
}

export function isValidLocation(value: string): value is Location {
  return VALID_LOCATIONS.has(value);
}

/** 목록에 한 번에 보여줄 밥집 수. */
export const LIST_PAGE_SIZE = 20;

/** 검색 입력이 멎고 나서 실제로 걸러내기까지 기다리는 시간(ms). */
export const SEARCH_DEBOUNCE_MS = 300;

/** '다시 뽑기'에서 후보 이름이 스쳐 지나가는 총 시간(ms). */
export const ROLL_DURATION_MS = 700;

/** 스쳐 지나가는 이름이 바뀌는 간격(ms). */
export const ROLL_TICK_MS = 70;

/**
 * 사진이 없는 밥집의 회색 박스에 넣을 종류 아이콘.
 * Record 로 묶어두면 CATEGORIES 에 종류를 추가할 때 여기도 채우도록 타입이 강제한다.
 */
export const CATEGORY_ICONS: Record<Category, string> = {
  한식: '🍚',
  양식: '🍝',
  중식: '🥟',
  일식: '🍣',
  분식: '🍢',
  '카페/디저트': '☕',
  '치킨/고기': '🍗',
  술집: '🍺',
};

export const SORT_CRITERIA = [
  { label: '기본 정렬', value: 'default' },
  { label: '이름순', value: 'name' },
  { label: '날짜순', value: 'date' },
] as const;

export const SORT_ORDERS = [
  { label: '오름차순', value: 'asc' }, // 오름차순
  { label: '내림차순', value: 'desc' }, // 내림차순
] as const;

export type SortCriterion = (typeof SORT_CRITERIA)[number]['value'];
export type SortOrder = (typeof SORT_ORDERS)[number]['value'];

// 유효성 검증
export const VALID_CRITERIA = SORT_CRITERIA.map(c => c.value);
export const VALID_ORDERS = SORT_ORDERS.map(o => o.value);

export function isValidSortCriterion(value: string): value is SortCriterion {
  return VALID_CRITERIA.includes(value as SortCriterion);
}

export function isValidSortOrder(value: string): value is SortOrder {
  return VALID_ORDERS.includes(value as SortOrder);
}

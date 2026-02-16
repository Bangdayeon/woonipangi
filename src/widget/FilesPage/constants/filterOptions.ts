export const CHARACTER = [
  { label: '전체 캐릭터', value: 'all' },
  { label: '우니팡이', value: 'wooniepang' },
  { label: '우니', value: 'woonie' },
  { label: '팡이', value: 'pang' },
] as const;

export const DEPARTMENT = [
  { label: '전체 부서', value: 'all' },
  { label: '동아리', value: 'club' },
  { label: '총동연', value: 'club_federation' },
  { label: '기타 부서', value: 'others' },
] as const;

export const EVENT = [
  { label: '전체 이벤트', value: 'all' },
  { label: '굿즈', value: 'goods' },
  { label: '아이엠마켓', value: 'iammarket' },
] as const;

export const ILLUST = [
  { label: '전체 일러스트', value: 'all' },
  { label: '달력 그림', value: 'calendar' },
  { label: '만화/짤', value: 'toon' },
  { label: '기타', value: 'others' },
] as const;

// UI용 배열
export const FILTER_OPTIONS = [CHARACTER, DEPARTMENT, EVENT, ILLUST];

// 타입 정의
export type CharacterType = (typeof CHARACTER)[number]['value'];
export type DepartmentType = (typeof DEPARTMENT)[number]['value'];
export type EventType = (typeof EVENT)[number]['value'];
export type IllustType = (typeof ILLUST)[number]['value'];

// 제네릭 헬퍼
export type FilterOption = readonly { readonly label: string; readonly value: string }[];

// 타입 가드 함수 (Set -> 조회, 타입 안전성 확보)
export const VALID_CHARACTERS = new Set(CHARACTER.map(c => c.value));
export const VALID_DEPARTMENTS = new Set(DEPARTMENT.map(d => d.value));
export const VALID_EVENTS = new Set(EVENT.map(e => e.value));
export const VALID_ILLUSTS = new Set(ILLUST.map(i => i.value));

export function isValidCharacter(value: string): value is CharacterType {
  return VALID_CHARACTERS.has(value as CharacterType);
}

export function isValidDepartment(value: string): value is DepartmentType {
  return VALID_DEPARTMENTS.has(value as DepartmentType);
}

export function isValidEvent(value: string): value is EventType {
  return VALID_EVENTS.has(value as EventType);
}

export function isValidIllust(value: string): value is IllustType {
  return VALID_ILLUSTS.has(value as IllustType);
}

// 필터 상태를 위한 인터페이스
export interface FilterState {
  character?: CharacterType;
  department?: DepartmentType;
  event?: EventType;
  illust?: IllustType;
}

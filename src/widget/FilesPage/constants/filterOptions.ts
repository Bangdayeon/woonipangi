export const CHARACTER = [
  { label: '전체 캐릭터', value: 'all_character' },
  { label: '우니팡이', value: 'wooniepang' },
  { label: '우니', value: 'woonie' },
  { label: '팡이', value: 'pang' },
] as const;

export const DEPARTMENT = [
  { label: '전체 부서', value: 'all_department' },
  { label: '동아리', value: 'club' },
  { label: '총동연', value: 'club_federation' },
  { label: '기타 부서', value: 'others' },
] as const;

export const EVENT = [
  { label: '전체 이벤트', value: 'all_event' },
  { label: '굿즈', value: 'goods' },
  { label: '아이엠마켓', value: 'iammarket' },
] as const;

export const ILLUST = [
  { label: '전체 일러스트', value: 'all_illust' },
  { label: '달력 그림', value: 'calendar' },
  { label: '만화/짤', value: 'toon' },
  { label: '일러스트', value: 'illust' },
] as const;

// UI용 배열
export const FILTER_OPTIONS = [CHARACTER, DEPARTMENT, EVENT, ILLUST];

// 타입 정의
export type CharacterType = (typeof CHARACTER)[number]['value'];
export type DepartmentType = (typeof DEPARTMENT)[number]['value'];
export type EventType = (typeof EVENT)[number]['value'];
export type IllustType = (typeof ILLUST)[number]['value'];

// 필터 상태를 위한 인터페이스
export interface FilterState {
  character?: CharacterType;
  department?: DepartmentType;
  event?: EventType;
  illust?: IllustType;
}

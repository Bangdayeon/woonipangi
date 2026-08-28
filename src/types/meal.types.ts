/**
 * 광운대 학생식당(함지마루) 식단 타입.
 *
 * 학교 식단안내 페이지는 "현재 게시된 한 주(월~금)"만 내려준다. 날짜 파라미터를
 * 넣어도 무시되므로 과거/미래 주 조회는 불가능하다.
 *
 * 페이로드에 "오늘"을 담지 않고 게시된 주 전체를 담는 것이 핵심이다.
 * 서버가 오늘을 골라 캐시하면 23:59에 캐시된 응답이 00:30에도 어제를 말하게 된다.
 * 주 단위로 캐시하고 날짜 선택은 클라이언트가 한다.
 */

/** 급식 코너(천원의 아침 / 자율중식 / 푸드코트)의 하루치 */
export interface MealCorner {
  /** 원본 코너명. 예: '광운대 함지마루천원의 아침' */
  title: string;
  /** 표시용 축약명. 예: '천원의 아침' */
  label: string;
  /** 가격 문구(괄호 제거). 예: '1,000원' */
  price: string;
  /** 판매시간. 예: '8:30 ~ 9:30' */
  time: string;
  /** 해당 날짜의 메뉴 줄. 방학·미운영이면 안내 문구가 그대로 들어온다. */
  menu: string[];
}

/** 게시된 주(월~금) 중 하루 */
export interface MealDay {
  /** 'YYYY-MM-DD' */
  date: string;
  /** '월요일' 등 */
  day: string;
  corners: MealCorner[];
}

/** 학교가 현재 게시 중인 주 단위 식단 전체 */
export interface MealWeek {
  /** 조회기간 시작 'YYYY-MM-DD' */
  from: string;
  /** 조회기간 종료 'YYYY-MM-DD' */
  to: string;
  /** 식당명. 예: '함지마루(복지관 학생식당)' */
  place: string;
  days: MealDay[];
  /** 원본 페이지 URL */
  sourceUrl: string;
  /** 파싱 시각 ISO */
  fetchedAt: string;
}

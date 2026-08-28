/**
 * 광운대 앞 밥집 목록. '오늘 뭐 먹지'(/games/bab)이 쓰는 유일한 데이터 소스.
 *
 * mapUrl 은 카카오맵 장소 URL(http://place.map.kakao.com/<id>)을 쓴다.
 * 카카오맵에서 가게를 검색해 '공유 > URL 복사'로 얻으면 된다.
 * (오픈API로 장소 정보를 받아와 이 파일에 저장하는 것은 카카오 약관상 금지다.
 *  저장이 허용되는 필드는 id 와 place_url 뿐이므로, 나머지는 직접 적는다.)
 */

export const CATEGORIES = [
  '한식',
  '양식',
  '중식',
  '일식',
  '분식',
  '카페/디저트',
  '치킨/고기',
  '술집',
] as const;

export const LOCATIONS = ['정문', '후문', '석계'] as const;

export type Category = (typeof CATEGORIES)[number];
export type Location = (typeof LOCATIONS)[number];

export interface Restaurant {
  /** URL·key 로 쓰이는 고유 식별자. 영문 소문자와 하이픈만 쓴다. */
  id: string;
  name: string;
  /** 여러 개 가능. 예: 치킨집은 ['치킨/고기', '술집'] */
  categories: Category[];
  location: Location;
  /** 한 줄 소개. 목록과 결과 카드에 그대로 노출되고 검색 대상이기도 하다. */
  description: string;
  /** 카카오맵 장소 URL */
  mapUrl: string;
  /**
   * R2 에 올린 원본 사진 URL. 없으면 종류 아이콘이 들어간 회색 박스로 대체된다.
   * 파일명은 다른 에셋과 겹치지 않게 'bab-<id>' 접두사를 쓸 것.
   * (썸네일 로더가 경로를 납작하게 만들어 thumb/<파일명>_640.webp 하나로 모으기 때문에
   *  이름이 겹치면 서로 덮어쓴다.)
   */
  image?: string;
}

// TODO: 아래는 형식 확인용 예시다. 실제 밥집으로 교체할 것.
export const restaurants: Restaurant[] = [
  {
    id: 'sample-korean',
    name: '예시 한식당',
    categories: ['한식'],
    location: '정문',
    description: '백반이 든든하고 반찬 리필이 된다.',
    mapUrl: 'https://map.kakao.com/',
  },
  {
    id: 'sample-bunsik',
    name: '예시 분식집',
    categories: ['분식'],
    location: '후문',
    description: '떡볶이랑 튀김이 싸고 양이 많다.',
    mapUrl: 'https://map.kakao.com/',
  },
  {
    id: 'sample-chicken',
    name: '예시 치킨집',
    categories: ['치킨/고기', '술집'],
    location: '석계',
    description: '늦게까지 하고 자리가 넓다.',
    mapUrl: 'https://map.kakao.com/',
  },
  {
    id: 'sample-cafe',
    name: '예시 카페',
    categories: ['카페/디저트'],
    location: '정문',
    description: '콘센트가 많아서 과제하기 좋다.',
    mapUrl: 'https://map.kakao.com/',
  },
  {
    id: 'sample-japanese',
    name: '예시 돈까스집',
    categories: ['일식'],
    location: '후문',
    description: '돈까스가 두껍고 소스가 진하다.',
    mapUrl: 'https://map.kakao.com/',
  },
];

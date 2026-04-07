export interface TestData {
  id: string;
  title: string;
  description: string;
}

export const tests: TestData[] = [
  {
    id: 'pangpang',
    title: '나는 어떤 팡팡이일까?',
    description: '나의 성격 유형을 알아보는 테스트입니다.',
  },
  {
    id: 'university',
    title: '대학생 유형 테스트',
    description: '대학생 유형을 분석해보는 테스트입니다.',
  },
  {
    id: 'fortune',
    title: '팡이의 마법의 소라고동',
    description: '오늘의 운세를 랜덤으로 확인해보세요.',
  },
  {
    id: 'building',
    title: '내게 맞는 광운대 건물',
    description: '나와 어울리는 광운대 건물을 알아보는 테스트입니다.',
  },
];

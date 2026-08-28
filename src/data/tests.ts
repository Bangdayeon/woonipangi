import { quizzes } from '@/data/quizzes';
import { StaticImageData } from 'next/image';

export interface TestData {
  id: string;
  title: string;
  description: string;
  img?: string | StaticImageData;
  bgcolor: string;
}

/** 퀴즈 엔진을 쓰지 않는 개별 구현 콘텐츠. */
const PANGS_CONCH: TestData = {
  id: 'pangs-conch',
  title: '마법의 팡이고둥',
  description: `마법의 팡이고둥에게\n질문해보세요`,
  img: '/images/services/pang_conch.png',
  bgcolor: 'bg-purple-400',
};

/** 밥집 랜덤 추천. 퀴즈 엔진과 무관한 별도 정적 라우트다. */
const BAB: TestData = {
  id: 'bab',
  title: '오늘 뭐 먹지',
  description: `메뉴를 추천해드립니다`,
  bgcolor: 'bg-yellow200',
};

// TODO: 다음 콘텐츠 후보 - 나는 어떤 팡팡이일까? / 대학생 유형 테스트

/**
 * 심심풀이 목록.
 * 퀴즈는 src/data/quizzes 레지스트리에서 자동으로 합쳐지므로,
 * 새 심리테스트를 추가할 때 이 파일은 건드리지 않아도 된다.
 */
export const tests: TestData[] = [
  PANGS_CONCH,
  BAB,
  ...quizzes.map(({ id, title, description, img, bgcolor }) => ({
    id,
    title,
    description,
    img,
    bgcolor,
  })),
];

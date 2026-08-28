import { Quiz } from '@/types/quiz.types';

import { kwBuilding } from './kwBuilding';

/**
 * 퀴즈 엔진이 다루는 심리테스트 목록.
 * 새 테스트 추가 = 데이터 파일 하나 작성 + 이 배열에 한 줄 추가.
 *
 * 주의: '마법의 팡이고둥'(pangs-conch)은 퀴즈가 아니라 별도 정적 라우트다.
 * 여기에 추가하면 /games/[quizId] 와 /games/pangs-conch 가 갈라지므로 넣지 말 것.
 */
export const quizzes: Quiz[] = [kwBuilding];

export const getQuiz = (id: string): Quiz | undefined => quizzes.find(quiz => quiz.id === id);

export const getQuizResult = (quiz: Quiz, resultId: string) =>
  quiz.results.find(result => result.id === resultId);

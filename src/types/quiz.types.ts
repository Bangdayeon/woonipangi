import { StaticImageData } from 'next/image';

/** 보기 하나. scores의 키는 같은 퀴즈의 QuizResult.id 여야 한다. */
export interface QuizChoice {
  id: string;
  label: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  text: string;
  choices: QuizChoice[];
}

export interface QuizResult {
  /** URL 세그먼트로 쓰이므로 라틴 슬러그로 작성한다. 예: 'chambit' */
  id: string;
  /** 결과 이름. 예: '참빛관' */
  name: string;
  /** 결과 카드 상단 한 줄 */
  headline: string;
  /** 결과 본문. \n 허용 (whitespace-pre-wrap 으로 렌더) */
  description: string;
  /** 해시태그처럼 노출할 짧은 키워드 */
  traits?: string[];
  /** 잘 맞는 결과 / 상극인 결과 (같은 퀴즈의 result id) */
  matchId?: string;
  clashId?: string;
  /** Tailwind 클래스 전체 리터럴이어야 한다. 예: 'bg-blue100' */
  bgcolor: string;
}

export interface Quiz {
  /** URL 세그먼트 = /games/{id} */
  id: string;
  title: string;
  description: string;
  intro: {
    headline: string;
    body: string;
    startLabel?: string;
  };
  /** 목록 카드 배경 (전체 클래스 리터럴) */
  bgcolor: string;
  img?: string | StaticImageData;
  questions: QuizQuestion[];
  /** 선언 순서 = 동점 시 우선순위 */
  results: QuizResult[];
}

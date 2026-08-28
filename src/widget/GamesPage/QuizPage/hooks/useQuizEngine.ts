'use client';

import { Quiz } from '@/types/quiz.types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

import { calculateQuizResult } from '../utils/calculateQuizResult';

/** 보기를 고른 뒤 다음 문항으로 넘어가기까지의 시간. 선택된 상태가 눈에 보이게 하려는 지연이다. */
const ADVANCE_DELAY = 250;

type QuizPhase = 'intro' | 'question';

interface QuizEngineState {
  phase: QuizPhase;
  index: number;
  /** 길이는 questions.length 와 같다. 아직 답하지 않은 문항은 null. */
  answers: (string | null)[];
  /** AnimatePresence 전환 방향 */
  direction: 1 | -1;
}

type QuizEngineAction =
  | { type: 'start' }
  | { type: 'select'; choiceId: string }
  | { type: 'advance' }
  | { type: 'back' };

const init = (quiz: Quiz): QuizEngineState => ({
  phase: 'intro',
  index: 0,
  answers: Array<string | null>(quiz.questions.length).fill(null),
  direction: 1,
});

const reducer = (state: QuizEngineState, action: QuizEngineAction): QuizEngineState => {
  switch (action.type) {
    case 'start':
      return { ...state, phase: 'question', index: 0, direction: 1 };

    case 'select': {
      const answers = [...state.answers];
      answers[state.index] = action.choiceId;
      return { ...state, answers };
    }

    case 'advance':
      if (state.index >= state.answers.length - 1) return state;
      return { ...state, index: state.index + 1, direction: 1 };

    case 'back':
      if (state.index === 0) return { ...state, phase: 'intro', direction: -1 };
      return { ...state, index: state.index - 1, direction: -1 };

    default:
      return state;
  }
};

export function useQuizEngine(quiz: Quiz) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, quiz, init);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 결과 페이지로의 이동은 한 번만. (연타 및 StrictMode 중복 실행 방지)
  const hasNavigatedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const total = quiz.questions.length;
  const question = quiz.questions[state.index];

  const goToResult = useCallback(
    (answers: (string | null)[]) => {
      if (hasNavigatedRef.current) return;
      hasNavigatedRef.current = true;
      setIsSubmitting(true);

      const result = calculateQuizResult(quiz, answers);
      router.push(`/games/${quiz.id}/result/${result.id}`);
    },
    [quiz, router]
  );

  const select = useCallback(
    (choiceId: string) => {
      if (hasNavigatedRef.current) return;

      const isLast = state.index === total - 1;
      dispatch({ type: 'select', choiceId });
      clearTimer();

      timerRef.current = setTimeout(() => {
        if (!isLast) {
          dispatch({ type: 'advance' });
          return;
        }
        const answers = [...state.answers];
        answers[state.index] = choiceId;
        goToResult(answers);
      }, ADVANCE_DELAY);
    },
    [clearTimer, goToResult, state.answers, state.index, total]
  );

  const start = useCallback(() => {
    clearTimer();
    dispatch({ type: 'start' });
  }, [clearTimer]);

  const back = useCallback(() => {
    clearTimer();
    dispatch({ type: 'back' });
  }, [clearTimer]);

  return {
    phase: state.phase,
    index: state.index,
    direction: state.direction,
    total,
    question,
    selectedId: state.answers[state.index],
    percent: ((state.index + 1) / total) * 100,
    isSubmitting,
    start,
    select,
    back,
  };
}

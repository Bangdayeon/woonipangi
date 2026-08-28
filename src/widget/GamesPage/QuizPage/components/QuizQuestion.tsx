'use client';

import { QuizQuestion as QuizQuestionType } from '@/types/quiz.types';
import { useEffect, useRef } from 'react';

import QuizChoiceButton from './QuizChoiceButton';

const PREV_KEYS = ['ArrowUp', 'ArrowLeft'];
const NEXT_KEYS = ['ArrowDown', 'ArrowRight'];

interface Props {
  question: QuizQuestionType;
  selectedId: string | null;
  disabled: boolean;
  onSelect: (choiceId: string) => void;
}

export default function QuizQuestion({ question, selectedId, disabled, onSelect }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // 문항이 바뀌면 답한 버튼이 사라지면서 포커스가 body로 날아간다. 제목으로 옮겨준다.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [question.id]);

  const selectedIndex = question.choices.findIndex(choice => choice.id === selectedId);

  /**
   * 방향키는 포커스만 옮기고 선택은 하지 않는다.
   * 보기를 고르면 곧바로 다음 문항으로 넘어가기 때문에, 방향키가 선택까지 하면
   * 훑어보려던 사용자가 의도치 않게 답을 확정하게 된다.
   */
  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const isPrev = PREV_KEYS.includes(event.key);
    const isNext = NEXT_KEYS.includes(event.key);
    if (!isPrev && !isNext) return;

    event.preventDefault();
    const count = question.choices.length;
    const nextIndex = (index + (isNext ? 1 : -1) + count) % count;
    buttonsRef.current[nextIndex]?.focus();
  };

  return (
    <div>
      <h2
        ref={headingRef}
        id={question.id}
        tabIndex={-1}
        className="mb-6 text-xl leading-relaxed font-bold outline-none md:mb-8 md:text-2xl"
      >
        {question.text}
      </h2>

      <div role="radiogroup" aria-labelledby={question.id} className="flex flex-col gap-3">
        {question.choices.map((choice, index) => (
          <QuizChoiceButton
            key={choice.id}
            ref={element => {
              buttonsRef.current[index] = element;
            }}
            choice={choice}
            selected={choice.id === selectedId}
            tabIndex={
              selectedIndex === -1 ? (index === 0 ? 0 : -1) : selectedIndex === index ? 0 : -1
            }
            disabled={disabled}
            onSelect={() => onSelect(choice.id)}
            onKeyDown={handleKeyDown(index)}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { QuizChoice } from '@/types/quiz.types';
import { forwardRef } from 'react';

import { choiceStyle } from '../QuizPage.style';

interface Props {
  choice: QuizChoice;
  selected: boolean;
  /** 그룹 전체가 탭 스톱 하나가 되도록 하는 roving tabindex 값 */
  tabIndex: number;
  disabled: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const QuizChoiceButton = forwardRef<HTMLButtonElement, Props>(
  ({ choice, selected, tabIndex, disabled, onSelect, onKeyDown }, ref) => (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={tabIndex}
      disabled={disabled}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={choiceStyle({ selected })}
    >
      <span className="font-body-md md:font-body-lg">{choice.label}</span>
    </button>
  )
);

QuizChoiceButton.displayName = 'QuizChoiceButton';
export default QuizChoiceButton;

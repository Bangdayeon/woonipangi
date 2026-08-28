'use client';

import Button from '@/shared/ui/Button/Button';
import { Quiz } from '@/types/quiz.types';

interface Props {
  quiz: Quiz;
  onStart: () => void;
}

export default function QuizIntro({ quiz, onStart }: Props) {
  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="mb-3 text-xl font-bold md:text-2xl">{quiz.intro.headline}</h2>
        <p className="font-body-md md:font-body-lg text-gray700 whitespace-pre-wrap">
          {quiz.intro.body}
        </p>
      </div>

      <Button size="lg" label={quiz.intro.startLabel ?? '시작하기'} onClick={onStart} />
    </div>
  );
}

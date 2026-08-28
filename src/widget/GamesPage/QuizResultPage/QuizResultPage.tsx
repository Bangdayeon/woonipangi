import LinkButton from '@/shared/ui/LinkButton/LinkButton';
import LinkIconButton from '@/shared/ui/LinkIconButton/LinkIconButton';
import { Quiz, QuizResult } from '@/types/quiz.types';

import QuizResultCard from './components/QuizResultCard';
import QuizShareButton from './components/QuizShareButton';

interface Props {
  quiz: Quiz;
  result: QuizResult;
}

export default function QuizResultPage({ quiz, result }: Props) {
  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="flex w-full grow flex-col md:max-w-200 lg:max-w-300">
        <header className="mb-5 flex items-center gap-4">
          <LinkIconButton
            variant="ghost"
            icon="IC_Arrow_Back"
            ariaLabel="심심풀이 목록으로 이동"
            href="/games"
          />
          <p className="font-title-md text-gray700">{quiz.title}</p>
        </header>

        <QuizResultCard quiz={quiz} result={result} />

        <div className="mt-8 mb-20 flex flex-wrap gap-3">
          <LinkButton label="나도 해보기" href={`/games/${quiz.id}`} />
          <QuizShareButton title={quiz.title} text={`나는 ${result.name}!`} />
          <LinkButton variant="tertiary" label="다른 심심풀이 보기" href="/games" />
        </div>
      </div>
    </main>
  );
}

import { getQuizResult } from '@/data/quizzes';
import { Quiz, QuizResult } from '@/types/quiz.types';
import clsx from 'clsx';

interface Props {
  quiz: Quiz;
  result: QuizResult;
}

export default function QuizResultCard({ quiz, result }: Props) {
  const match = result.matchId ? getQuizResult(quiz, result.matchId) : undefined;
  const clash = result.clashId ? getQuizResult(quiz, result.clashId) : undefined;

  return (
    <article className={clsx('flex flex-col gap-5 rounded-2xl p-6 md:p-8', result.bgcolor)}>
      <div>
        <p className="font-label-md text-gray700 mb-1">{result.headline}</p>
        <h1 className="text-3xl font-bold md:text-4xl">{result.name}</h1>
      </div>

      <p className="font-body-md md:font-body-lg text-gray800 whitespace-pre-wrap">
        {result.description}
      </p>

      {result.traits && result.traits.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {result.traits.map(trait => (
            <li
              key={trait}
              className="font-label-sm text-gray700 rounded-full bg-white/70 px-3 py-1"
            >
              {trait}
            </li>
          ))}
        </ul>
      )}

      {(match || clash) && (
        <dl className="flex flex-col gap-2 border-t border-white/60 pt-4">
          {match && (
            <div className="flex gap-2">
              <dt className="font-label-md text-gray600 shrink-0">잘 맞는 건물</dt>
              <dd className="font-label-md text-gray900">{match.name}</dd>
            </div>
          )}
          {clash && (
            <div className="flex gap-2">
              <dt className="font-label-md text-gray600 shrink-0">상극인 건물</dt>
              <dd className="font-label-md text-gray900">{clash.name}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

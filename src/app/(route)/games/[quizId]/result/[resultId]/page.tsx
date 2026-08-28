import { getQuiz, getQuizResult, quizzes } from '@/data/quizzes';
import QuizResultPage from '@/widget/GamesPage/QuizResultPage/QuizResultPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ quizId: string; resultId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return quizzes.flatMap(quiz =>
    quiz.results.map(result => ({ quizId: quiz.id, resultId: result.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quizId, resultId } = await params;
  const quiz = getQuiz(quizId);
  const result = quiz && getQuizResult(quiz, resultId);
  if (!quiz || !result) return {};

  // 루트 layout에 '%s | 우니팡이' 템플릿이 걸려 있어 사이트명은 자동으로 붙는다.
  const title = `${quiz.title}: ${result.name}`;
  const description = `${result.headline} - ${quiz.title} 결과`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default async function Page({ params }: Props) {
  const { quizId, resultId } = await params;
  const quiz = getQuiz(quizId);
  const result = quiz && getQuizResult(quiz, resultId);
  if (!quiz || !result) notFound();

  return <QuizResultPage quiz={quiz} result={result} />;
}

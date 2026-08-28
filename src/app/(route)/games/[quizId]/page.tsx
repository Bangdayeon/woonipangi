import { getQuiz, quizzes } from '@/data/quizzes';
import { validateQuiz } from '@/data/quizzes/validateQuiz';
import QuizPage from '@/widget/GamesPage/QuizPage/QuizPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ quizId: string }>;
};

// 퀴즈 목록은 레포 안에 있으므로 빌드 시점에 전부 확정된다.
export const dynamicParams = false;

export function generateStaticParams() {
  return quizzes.map(quiz => ({ quizId: quiz.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  if (!quiz) return {};

  const description = quiz.description.replace(/\n/g, ' ');

  return {
    title: quiz.title,
    description,
    openGraph: { title: quiz.title, description },
    twitter: { title: quiz.title, description },
  };
}

export default async function Page({ params }: Props) {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  if (!quiz) notFound();

  if (process.env.NODE_ENV !== 'production') {
    validateQuiz(quiz).forEach(problem => console.warn(`[quiz] ${problem}`));
  }

  return <QuizPage quiz={quiz} />;
}

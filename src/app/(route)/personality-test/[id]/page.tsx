import { TestData, tests } from '@/data/tests';
import PangsFortune from '@/widget/PersonalityTestPage/TestPages/PangsFortune';
import TestPage from '@/widget/PersonalityTestPage/TestPages/TestPage';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const test = tests.find(t => t.id === id);
  return {
    title: test?.title ?? '테스트',
    description: test?.description ?? '',
  };
}

export default async function TestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const test: TestData | undefined = tests.find(t => t.id === id);

  if (!test) notFound();

  if (id === 'fortune') {
    return <PangsFortune title={test.title} description={test.description} />;
  }

  return <TestPage title={test.title} description={test.description} />;
}

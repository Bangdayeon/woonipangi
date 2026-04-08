import { TestData, tests } from '@/data/tests';
import PangsConch from '@/widget/GamesPage/TestPages/PangsConch';
import TestPage from '@/widget/GamesPage/TestPages/TestPage';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const test = tests.find(t => t.id === params.id);
  return {
    title: test?.title ?? '테스트',
    description: test?.description ?? '',
    openGraph: {
      title: test?.title,
      description: test?.description,
      images: test?.img ? [typeof test.img === 'string' ? test.img : test.img.src] : [],
    },
    twitter: {
      title: test?.title,
      description: test?.description,
      images: test?.img ? [typeof test.img === 'string' ? test.img : test.img.src] : [],
    },
  };
}

// 페이지 렌더링
export default async function TestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const test: TestData | undefined = tests.find(t => t.id === id);

  if (!test) return notFound();

  if (test.id === 'pangs-conch') {
    return <PangsConch description={test.description} />;
  }

  return <TestPage title={test.title} description={test.description} />;
}

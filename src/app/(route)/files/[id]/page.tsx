import { CardDatas } from '@/data/cards';
import { OG_IMAGE_SIZE, toOgImageUrl } from '@/shared/lib/ogImage';
import FileIdPage from '@/widget/FileIdPage/FileIdPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return CardDatas.map(card => ({ id: String(card.id) }));
}

/**
 * 동적 메타데이터 생성
 * 각 페이지의 title, description, OpenGraph 태그를 파일 정보에 맞게 설정
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const card = CardDatas.find(c => c.id === Number(id));

  if (!card) return {};

  return {
    title: card.title,
    description: card.tmi,
    openGraph: {
      title: card.title,
      description: card.tmi,
      images: [
        {
          url: toOgImageUrl(card.thumbnail),
          ...OG_IMAGE_SIZE,
          alt: `${card.title} 이미지`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: card.title,
      description: card.tmi,
      images: [toOgImageUrl(card.thumbnail)],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const card = CardDatas.find(c => c.id === Number(id));

  if (!card) {
    notFound();
  }

  return <FileIdPage {...card} />;
}

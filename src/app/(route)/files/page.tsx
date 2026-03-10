import { CardDatas } from '@/data/cards';
import FilesPage from '@/widget/FilesPage/FilesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '파일 목록',
  description: '우니&팡이의 파일을 검색하고 다운로드해보세요.',
};

// searchParams를 Props로 직접 받음
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const rawQ = resolvedParams.q;
  // 서버 사이드에서 최소한의 초기 필터링을 수행하여 SEO 보장
  const query = Array.isArray(rawQ) ? (rawQ[0] ?? '') : (rawQ ?? '');

  // 검색 엔진이 읽게 될 초기 데이터
  const initialCards = CardDatas.filter(
    card => card.title.includes(query) || card.tags.some(tag => tag.includes(query))
  );

  return <FilesPage allCards={CardDatas} />;
}

import GamesPage from '@/widget/GamesPage/GamesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '광운대생 심심풀이',
  description: '광운대학교 팡팡이들을 위한 심심풀이 공간',
};

export default function Page() {
  return <GamesPage />;
}

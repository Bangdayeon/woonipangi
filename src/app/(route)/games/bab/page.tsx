import BabPage from '@/widget/GamesPage/BabPage/BabPage';

export const metadata = {
  title: '오늘 뭐 먹지',
  description: '광운대 앞에서 오늘 뭐 먹을지 대신 골라드려요',
  openGraph: {
    title: '오늘 뭐 먹지',
    description: '광운대 앞에서 오늘 뭐 먹을지 대신 골라드려요',
  },
  twitter: {
    title: '오늘 뭐 먹지',
    description: '광운대 앞에서 오늘 뭐 먹을지 대신 골라드려요',
  },
};

export default function Page() {
  return <BabPage />;
}

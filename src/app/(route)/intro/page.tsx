import IntroPage from '@/widget/IntroPage/IntroPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마스코트 소개',
  description: '우니&팡이를 소개합니다.',
};

export default function Page() {
  return <IntroPage />;
}

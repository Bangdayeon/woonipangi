import AskPage from '@/widget/AskPage/AskPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의하기',
  description: '우니팡이에게 문의를 남겨보세요.',
};

export default function Page() {
  return <AskPage />;
}

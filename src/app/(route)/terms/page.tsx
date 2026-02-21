import TermsPage from '@/widget/TermsPage/TermsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 이용약관',
  description: '우니&팡이 서비스 이용약관을 확인하세요.',
};

export default function Page() {
  return <TermsPage />;
}

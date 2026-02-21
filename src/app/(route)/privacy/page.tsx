import PrivacyPage from '@/widget/PrivacyPage/PrivacyPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description: '우니&팡이 서비스의 개인정보 처리방침을 확인하세요.',
};

export default function Page() {
  return <PrivacyPage />;
}

import PersonalityTestPage from '@/widget/PersonalityTestPage/PersonalityTestPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '성격테스트',
  description: '광운대학교 팡팡이들을 위한 성격 테스트 공간',
};

export default function Page() {
  return <PersonalityTestPage />;
}

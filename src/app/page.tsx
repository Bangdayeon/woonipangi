import HomePage from '@/widget/HomePage/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: '우니&팡이 공식 홈페이지에 오신 것을 환영합니다.',
};

export default function Home() {
  return <HomePage />;
}

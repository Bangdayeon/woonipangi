import PangsConch from '@/widget/GamesPage/TestPages/PangsConch';

export const metadata = {
  title: '팡이의 소라고둥',
  description: '팡이의 마법의 소라고둥에게 질문해보세요',
  openGraph: {
    title: '팡이의 소라고둥',
    description: '팡이의 소라고둥에게 질문해보세요',
    images: ['/images/services/pang_conch.png'],
  },
  twitter: {
    title: '팡이의 소라고둥',
    description: '팡이의 소라고둥에게 질문해보세요',
    images: ['/images/services/pang_conch.png'],
  },
};

export default function PangsConchPage() {
  return <PangsConch description="팡이의 소라고둥에게 질문해보세요" />;
}

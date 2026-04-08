import pangConchImg from '@/assets/images/services/pang_conch.png';
import { StaticImageData } from 'next/image';

export interface TestData {
  id: string;
  title: string;
  description: string;
  img?: string | StaticImageData;
  bgcolor: string;
}

export const tests: TestData[] = [
  // {
  //   id: 'pangpang',
  //   title: '나는 어떤 팡팡이일까?',
  //   description: '나의 성격 유형을 알아보는 테스트입니다.',
  //   bgcolor: 'bg-yellow200',
  // },
  // {
  //   id: 'university',
  //   title: '대학생 유형 테스트',
  //   description: '대학생 유형을 분석해보는 테스트입니다.',
  //   bgcolor: 'bg-blue200',
  // },
  {
    id: 'pangs-conch',
    title: '팡이의 소라고둥',
    description: `팡이의 소라고둥에게\n질문해보세요`,
    img: pangConchImg,
    bgcolor: 'bg-purple-400',
  },
  // {
  //   id: 'building',
  //   title: '내게 맞는 광운대 건물',
  //   description: '나와 어울리는 광운대 건물을 알아보는 테스트입니다.',
  //   bgcolor: 'bg-green100',
  // },
];

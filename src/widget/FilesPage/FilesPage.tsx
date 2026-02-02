'use client';

import CardList from '@/shared/ui/CardList';

export default function FilesPage() {
  // 예시 데이터
  const sampleCards = [
    {
      image: '/images/illust_01.png',
      tags: ['3D', '판타지', '여성'],
      title: '엘프 전사',
      uploadDate: new Date('2024-01-15'),
    },
    {
      image: '/images/pang_02.png',
      tags: ['2D', '현대', '남성'],
      title: '사이버펑크 해커',
      uploadDate: new Date('2024-01-20'),
    },
    {
      image: '/images/woonie_01.png',
      tags: ['3D', 'SF', '로봇'],
      title: '메카 파일럿',
      uploadDate: new Date('2024-01-25'),
    },
    {
      image: '/images/woonie_02.png',
      tags: ['2D', '판타지', '여성'],
      title: '마법사',
      uploadDate: new Date('2024-02-01'),
    },
    {
      image: '/images/woonie_03.png',
      tags: ['3D', '중세', '남성'],
      title: '기사',
      uploadDate: new Date('2024-02-02'),
    },
    {
      image: '/images/woonie_04.png',
      tags: ['3D', '중세', '남성'],
      title: '기사',
      uploadDate: new Date('2024-02-02'),
    },
    {
      image: '/images/woonie_05.png',
      tags: ['3D', '중세', '남성'],
      title: '기사',
      uploadDate: new Date('2024-02-02'),
    },
    {
      image: '/images/wp_01.png',
      tags: ['3D', '중세', '남성'],
      title: '기사',
      uploadDate: new Date('2024-02-02'),
    },
  ];

  return (
    <div className="my-8 flex h-full justify-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">캐릭터 파일 다운 페이지</h1>
        <CardList cards={sampleCards} />
      </div>
    </div>
  );
}

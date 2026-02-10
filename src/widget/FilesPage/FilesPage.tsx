'use client';

import CardList from '@/shared/ui/CardList';

export default function FilesPage() {
  // 예시 데이터
  const sampleCards = [
    {
      id: 1,
      title: '엘프 전사',
      tags: ['3D', '판타지', '여성'],
      fileUrls: ['https://example.com/files/elf_warrior.zip'],
      thumbnail: 'https://pub-c055a1822d244b0aaba0dc63c00dcba2.r2.dev/mark.png',
      createdAt: new Date('2024-01-15').toISOString(),
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

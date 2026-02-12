'use client';

import { CardDatas } from '@/data/cards';
import CardList from '@/shared/ui/CardList';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function FilesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = 24;

  // url에서 현재 페이지 번호 추출
  const currentPage = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(CardDatas.length / pageSize));
    const page = searchParams.get('page');
    const parsedPage = page ? parseInt(page, 10) : 1;
    return isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, totalPages);
  }, [searchParams]);

  // 현재 페이지에 해당하는 데이터 슬라이싱
  const displayedCards = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return CardDatas.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    // shallow routing을 위해 push 사용
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    // 페이지 최상단으로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="mx-auto my-30 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <header className="mb-10">
          <h1 className="text-gray900 text-2xl font-bold md:text-3xl">캐릭터 파일 다운 페이지</h1>
          <p className="text-gray500 mt-2">원하는 캐릭터 리소스를 선택하여 다운로드하세요.</p>
        </header>

        {/* 리스트 */}
        <div className="min-h-150">
          <CardList cards={displayedCards} />
        </div>

        {/* 하단 페이지네이션 컨트롤 */}
        <div className="mt-16 mb-20 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalCount={CardDatas.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}

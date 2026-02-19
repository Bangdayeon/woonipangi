'use client';

import { Card } from '@/types/card.types';
import CardList from '@/widget/FilesPage/components/CardList';
import { useMemo } from 'react';

import Filter from './components/Filter';
import { Pagination } from './components/Pagination/Pagination';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import { PAGE_SIZE } from './constants/paginationOptions';
import { useCardList } from './hooks/useCardList';
import { usePagination } from './hooks/usePagination';

interface Props {
  allCards: Card[];
  initialCards: Card[]; // 서버에서 넘어온 초기 필터링 데이터
}

export default function FilesPage({ allCards, initialCards }: Props) {
  // 검색 필터 정렬된 카드 리스트
  const { cards: processedCards } = useCardList(allCards);

  // 페이지네이션
  const { currentPage, paginatedRange, handlePageChange } = usePagination(
    processedCards.length,
    PAGE_SIZE
  );

  // 현재 페이지에 표시할 카드
  const displayedCards = useMemo(() => {
    // 만약 클라이언트 로직이 아직 계산 전이거나 데이터가 없다면 서버에서 받은 initialCards를 우선 보여줌
    // 하지만 Next.js 클라이언트 컴포넌트는 마운트 시점에 이미 processedCards를 계산하므로
    // 초기 렌더링 시점에 processedCards가 비어있을 때 initialCards를 fallback으로 사용
    if (processedCards.length === 0 && initialCards.length > 0) {
      return initialCards.slice(0, PAGE_SIZE);
    }

    return processedCards.slice(paginatedRange.start, paginatedRange.end);
  }, [processedCards, paginatedRange, initialCards]);

  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <header className="mb-5">
          <h1 className="text-gray900 text-2xl font-bold md:text-3xl">마스코트 모음</h1>
        </header>

        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-2">
            <SearchBar />
            <Filter />
          </div>
          <SortDropdown className="mt-10 flex justify-end" />
        </div>

        <div className="mt-4 min-h-150">
          {displayedCards.length > 0 ? (
            <CardList cards={displayedCards} />
          ) : (
            <div className="text-gray300 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={processedCards.length} // 필터링된 개수 전달
          pageSize={PAGE_SIZE}
          className="mt-16 mb-20 flex justify-center"
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

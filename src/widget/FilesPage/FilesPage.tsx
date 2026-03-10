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
}

export default function FilesPage({ allCards }: Props) {
  const { cards: processedCards } = useCardList(allCards);

  const { currentPage, paginatedRange, handlePageChange } = usePagination(
    processedCards.length,
    PAGE_SIZE
  );

  const displayedCards = useMemo(() => {
    return processedCards.slice(paginatedRange.start, paginatedRange.end);
  }, [processedCards, paginatedRange]);

  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <h1 className="mb-5 text-2xl font-bold md:text-3xl">마스코트 모음</h1>

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
          totalCount={processedCards.length}
          pageSize={PAGE_SIZE}
          className="mt-16 mb-20 flex justify-center"
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

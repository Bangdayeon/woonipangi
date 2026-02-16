'use client';

import { CardDatas } from '@/data/cards';
import { useModalStore } from '@/stores/modalStore';
import CardList from '@/widget/FilesPage/components/CardList';
import { useMemo } from 'react';

import CardModal from './components/CardModal';
import Filter from './components/Filter';
import { Pagination } from './components/Pagination/Pagination';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import { PAGE_SIZE } from './constants/paginationOptions';
import { useCardList } from './hooks/useCardList';
import { usePagination } from './hooks/usePagination';

export default function FilesPage() {
  const { type, props } = useModalStore();

  // 검색 필터 정렬된 카드 리스트
  const { cards: processedCards } = useCardList(CardDatas);

  // 페이지네이션
  const { currentPage, paginatedRange, handlePageChange } = usePagination(
    processedCards.length,
    PAGE_SIZE
  );

  // 현재 페이지에 표시할 카드
  const displayedCards = useMemo(() => {
    return processedCards.slice(paginatedRange.start, paginatedRange.end);
  }, [processedCards, paginatedRange]);

  return (
    <>
      <div className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
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
      </div>
      {type === 'CARDMORE' && props && (
        <CardModal
          image={props.thumbnail as string}
          title={props.title as string}
          tmi={props.tmi as string}
        />
      )}
    </>
  );
}

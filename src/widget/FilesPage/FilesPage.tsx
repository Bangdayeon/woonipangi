'use client';

import { CardDatas } from '@/data/cards';
import Input from '@/shared/ui/Input/Input';
import { useModalStore } from '@/stores/modalStore';
import CardList from '@/widget/FilesPage/components/CardList';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import CardModal from './components/CardModal';
import { Pagination } from './components/Pagination/Pagination';

interface QueryParams {
  q?: string | null;
  page?: number | string | null;
}

export default function FilesPage() {
  const searchParams = useSearchParams();
  const pageSize = 24;

  const { type, props } = useModalStore();

  const [inputValue, setInputValue] = useState(searchParams.get('q') || ''); // 로컬 상태 추가: 한글 입력 끊김 방지를 위한 입력창 전용 상태
  const searchTerm = searchParams.get('q') || ''; // URL 검색어 추출

  // URL 검색어가 바뀌면(뒤로가기 등) 입력창 상태도 동기화
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const currentPage = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(CardDatas.length / pageSize));
    const page = searchParams.get('page');
    const parsedPage = page ? parseInt(page, 10) : 1;
    return isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, totalPages);
  }, [searchParams]);

  const filteredCards = useMemo(() => {
    if (!searchTerm.trim()) return CardDatas;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return CardDatas.filter(card => {
      const isTitleMatch = card.title.toLowerCase().includes(lowerCaseSearch);
      const isTagMatch = card.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch));
      return isTitleMatch || isTagMatch;
    });
  }, [searchTerm]);

  const displayedCards = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCards.slice(start, start + pageSize);
  }, [filteredCards, currentPage, pageSize]);

  // URL 업데이트 핸들러
  const updateQueryParams = (newParams: QueryParams) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      // value가 undefined일 수도 있으므로 체크 추가
      if (value === null || value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 입력이 멈춘 후 300ms 뒤에 URL을 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      // 실제 URL 업데이트는 inputValue가 searchTerm과 다를 때만 수행
      if (inputValue !== searchTerm) {
        updateQueryParams({ q: inputValue, page: 1 });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, searchTerm]);

  const handlePageChange = (page: number) => {
    updateQueryParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
        <div className="w-full md:max-w-200 lg:max-w-300">
          <header className="mb-5">
            <h1 className="text-gray900 text-2xl font-bold md:text-3xl">마스코트 모음</h1>
          </header>

          <div className="mb-10">
            <Input
              placeholder="검색어를 입력해주세요."
              icon="IC_Search"
              value={inputValue} // searchTerm 대신 로컬 상태인 inputValue 사용
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            />
          </div>

          <div className="min-h-150">
            {displayedCards.length > 0 ? (
              <CardList cards={displayedCards} />
            ) : (
              <div className="text-gray300 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>

          <div className="mt-16 mb-20 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalCount={filteredCards.length} // 필터링된 개수 전달
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      {type === 'CARDMORE' && props && (
        <CardModal image={props.thumbnail as string} title={props.title as string} />
      )}
    </>
  );
}

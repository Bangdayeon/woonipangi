'use client';

import { Restaurant } from '@/data/restaurants';
import Input from '@/shared/ui/Input/Input';
import { Pagination } from '@/widget/FilesPage/components/Pagination/Pagination';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { LIST_PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '../constants/filterOptions';
import RestaurantThumbnail from './RestaurantThumbnail';

interface Props {
  /** 필터가 이미 적용된 후보 목록. 검색은 여기서 한 번 더 좁힌다. */
  candidates: Restaurant[];
  onSelect: (restaurant: Restaurant) => void;
}

export default function RestaurantList({ candidates, onSelect }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pagedFor, setPagedFor] = useState({ term: '', candidates });

  // 입력이 멎고 나서야 목록을 다시 그린다.
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(inputValue), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const visible = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const searched = keyword
      ? candidates.filter(
          restaurant =>
            restaurant.name.toLowerCase().includes(keyword) ||
            restaurant.description.toLowerCase().includes(keyword)
        )
      : candidates;

    return [...searched].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }, [candidates, searchTerm]);

  // 검색어나 필터가 바뀌면 보고 있던 페이지 번호는 의미가 없어진다.
  // effect 로 되돌리면 한 프레임 동안 엉뚱한 페이지가 보이므로 렌더 중에 맞춘다.
  if (pagedFor.term !== searchTerm || pagedFor.candidates !== candidates) {
    setPagedFor({ term: searchTerm, candidates });
    setPage(1);
  }

  const paged = visible.slice((page - 1) * LIST_PAGE_SIZE, page * LIST_PAGE_SIZE);

  return (
    <div className="mt-4 w-full">
      <Input
        className="w-full min-w-0"
        placeholder="밥집 이름이나 메뉴로 검색"
        icon="IC_Search"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        aria-label="밥집 검색"
        role="search"
      />

      {visible.length === 0 ? (
        <p className="font-body-md text-gray600 py-10 text-center">검색 결과가 없습니다.</p>
      ) : (
        <>
          <ul className="mt-3 flex flex-col">
            {paged.map(restaurant => (
              <li key={restaurant.id}>
                <button
                  type="button"
                  onClick={() => onSelect(restaurant)}
                  className="border-gray100 hover:bg-gray50 flex w-full cursor-pointer items-center gap-3 border-b px-1 py-3 text-left transition-colors"
                >
                  <RestaurantThumbnail restaurant={restaurant} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="font-label-md">{restaurant.name}</span>
                    <span className="font-label-xs text-gray500 ml-2">
                      {restaurant.categories.join(', ')} · {restaurant.location}
                    </span>
                    <span className="font-body-sm text-gray600 mt-0.5 block truncate">
                      {restaurant.description}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <Pagination
            className="mt-4"
            currentPage={page}
            totalCount={visible.length}
            pageSize={LIST_PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

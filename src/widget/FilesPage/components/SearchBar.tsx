'use client';

import Input from '@/shared/ui/Input/Input';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { useQueryParams } from '../hooks/useQueryParams';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const { updateQueryParams } = useQueryParams();

  const searchTerm = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(searchTerm);

  // URL 변경 시 입력값 동기화 (뒤로가기 대응)
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // 디바운스: 300ms 후 URL 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchTerm) {
        updateQueryParams({ q: inputValue, page: 1 });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, searchTerm, updateQueryParams]);

  return (
    <Input
      placeholder="검색어를 입력해주세요."
      icon="IC_Search"
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      aria-label="검색"
      role="search"
    />
  );
}

import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useQueryParams } from './useQueryParams';

/**
 * 페이지네이션에 필요한 현재 페이지 상태와 데이터 범위 계산 훅
 * * @param totalCount - 전체 데이터의 개수
 * @param pageSize - 한 페이지에 보여줄 데이터의 개수
 * * @returns
 * - `currentPage`: 현재 페이지 번호
 * - `paginatedRange`: 현재 페이지에 해당하는 데이터의 인덱스 {start, end}
 * - `handlePageChange`: 페이지를 변경하고 URL을 업데이트하며 화면 상단으로 스크롤하는 함수
 * * @example
 * ```tsx
 * const { currentPage, paginatedRange, handlePageChange } = usePagination(100, 24);
 * * // 데이터 슬라이싱에 사용
 * const displayedData = data.slice(paginatedRange.start, paginatedRange.end);
 * ```
 */
export function usePagination(totalCount: number, pageSize: number) {
  const searchParams = useSearchParams();
  const { updateQueryParams } = useQueryParams();

  // 현재 페이지 계산
  const currentPage = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const page = searchParams.get('page');
    const parsedPage = page ? parseInt(page, 10) : 1;
    return isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, totalPages);
  }, [searchParams, totalCount, pageSize]);

  // 데이터 범위 계산 (slice(start, end)에 사용 가능)
  const paginatedRange = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return { start, end };
  }, [currentPage, pageSize]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams({ page });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateQueryParams]
  );

  return {
    currentPage,
    paginatedRange,
    handlePageChange,
  };
}

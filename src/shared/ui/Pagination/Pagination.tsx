import clsx from 'clsx';

import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { style } from './Pagination.style';
import { getVisiblePages } from './getVisiblePages';

export interface PaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number, pageSize: number) => void;
  pageSize?: number; // 반응형 pageSize 전달
}
export const Pagination = ({
  currentPage,
  totalCount,
  onPageChange,
  pageSize = 20,
}: PaginationProps) => {
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));

  const clamp = (page: number) => Math.min(Math.max(page, 1), totalPages);
  const goTo = (page: number) => onPageChange(clamp(page), safePageSize);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const slots = style();

  return (
    <nav aria-label="페이지 이동" className={slots.container()}>
      <IconButton
        type="button"
        icon="IC_Arrow_Back"
        className={clsx(slots.button(), slots.arrowButton())}
        disabled={isFirstPage}
        onClick={() => goTo(currentPage - 1)}
        ariaLabel="이전 페이지"
      />

      {visiblePages.map(p => {
        const active = p === currentPage;
        return (
          <Button
            key={p}
            label={p.toString()}
            type="button"
            className={clsx(slots.button(), active && slots.active())}
            onClick={() => goTo(p)}
            aria-current={active ? 'page' : undefined}
          />
        );
      })}
      <IconButton
        icon="IC_Arrow_Next"
        type="button"
        className={clsx(slots.button(), slots.arrowButton())}
        disabled={isLastPage}
        onClick={() => goTo(currentPage + 1)}
        ariaLabel="다음 페이지"
      />
    </nav>
  );
};

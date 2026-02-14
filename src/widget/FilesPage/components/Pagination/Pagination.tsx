import Button from '@/shared/ui/Button/Button';
import IconButton from '@/shared/ui/IconButton/IconButton';
import { PAGE_SIZE } from '@/widget/FilesPage/constants/paginationOptions';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';

import { style } from './Pagination.style';
import { getVisiblePages } from './getVisiblePages';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void; // pageSize 파라미터 제거
  pageSize?: number;
}

export const Pagination = ({
  currentPage,
  totalCount,
  onPageChange,
  pageSize = PAGE_SIZE,
  className,
  ...rest
}: PaginationProps) => {
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));

  const goTo = useCallback(
    (page: number) => {
      const clampedPage = Math.min(Math.max(page, 1), totalPages);
      onPageChange(clampedPage);
    },
    [onPageChange, totalPages]
  );

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const slots = style();

  // 키보드 화살표로 페이지 이동
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 폼 입력 요소(Input, TextArea 등)에서 입력 중일 때는 동작 방지
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        if (!isFirstPage) {
          event.preventDefault(); // 브라우저 스크롤 방지
          goTo(currentPage - 1);
        }
      } else if (event.key === 'ArrowRight') {
        if (!isLastPage) {
          event.preventDefault(); // 브라우저 스크롤 방지
          goTo(currentPage + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, isFirstPage, isLastPage, goTo]);

  return (
    <nav aria-label="페이지 이동" className={clsx(slots.container(), className)} {...rest}>
      <IconButton
        icon="IC_Arrow_Back"
        variant="secondary"
        size="sm"
        className={clsx(slots.button(), slots.arrowButton(), isFirstPage && 'invisible')}
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
            variant="secondary"
            size="sm"
            radius="full"
            className={clsx(slots.button(), active && slots.active())}
            onClick={() => goTo(p)}
            aria-current={active ? 'page' : undefined}
          />
        );
      })}
      <IconButton
        icon="IC_Arrow_Next"
        variant="secondary"
        size="sm"
        className={clsx(slots.button(), slots.arrowButton(), isLastPage && 'invisible')}
        disabled={isLastPage}
        onClick={() => goTo(currentPage + 1)}
        ariaLabel="다음 페이지"
      />
    </nav>
  );
};

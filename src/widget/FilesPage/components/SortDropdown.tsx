'use client';

import Dropdown from '@/shared/ui/Dropdown/Dropdown';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { SORT_CRITERIA, SORT_ORDERS } from '../constants/sortOptions';
import { useQueryParams } from '../hooks/useQueryParams';

interface SortDropdownProps {
  className?: string;
}

export default function SortDropdown({ className }: SortDropdownProps) {
  const searchParams = useSearchParams();
  const { updateQueryParams } = useQueryParams();

  const currentCriterion = searchParams.get('sortBy') || 'all';
  const currentOrder = searchParams.get('order') || 'asc';

  // 정렬 기준
  const selectedOption = useMemo(
    () => SORT_CRITERIA.find(opt => opt.value === currentCriterion) || SORT_CRITERIA[0],
    [currentCriterion]
  );

  // 정렬 순서
  const selectedOrder = useMemo(
    () => SORT_ORDERS.find(opt => opt.value === currentOrder) || SORT_ORDERS[0],
    [currentOrder]
  );

  const handleCriterionChange = (option: { label: string; value: string }) => {
    updateQueryParams({
      sortBy: option.value === 'all' ? null : option.value,
      page: 1,
    });
  };

  const handleOrderChange = (option: { label: string; value: string }) => {
    updateQueryParams({
      order: option.value === 'asc' ? null : option.value,
      page: 1,
    });
  };

  return (
    <div className={clsx('flex gap-2', className)}>
      <Dropdown
        options={SORT_CRITERIA}
        value={selectedOption}
        onSelect={handleCriterionChange}
        size="sm"
        rounded="md"
        aria-label="정렬 기준"
      />
      <Dropdown
        options={SORT_ORDERS}
        value={selectedOrder}
        onSelect={handleOrderChange}
        size="sm"
        rounded="md"
        aria-label="정렬 순서"
      />
    </div>
  );
}

import Dropdown, { DropdownOption } from '@/shared/ui/Dropdown/Dropdown';
import IconButton from '@/shared/ui/IconButton/IconButton';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { CHARACTER, DEPARTMENT, EVENT, ILLUST } from '../constants/filterOptions';
import { useQueryParams } from '../hooks/useQueryParams';

interface FilterProps {
  className?: string;
}

// 필터 설정 배열
const FILTERS = [
  { key: 'character', options: CHARACTER, placeholder: '캐릭터' },
  { key: 'department', options: DEPARTMENT, placeholder: '부서' },
  { key: 'event', options: EVENT, placeholder: '이벤트' },
  { key: 'illust', options: ILLUST, placeholder: '일러스트' },
] as const;

export default function Filter({ className }: FilterProps) {
  const searchParams = useSearchParams();
  const { updateQueryParams } = useQueryParams();

  // 선택된 옵션 찾기 헬퍼
  const getSelectedOption = useCallback(
    (key: string, options: readonly DropdownOption[]) => {
      const current = searchParams.get(key);
      return current && current !== 'all'
        ? (options.find(opt => opt.value === current) ?? null)
        : null;
    },
    [searchParams]
  );

  // 각 필터의 선택 상태
  const selectedValues = useMemo(
    () => ({
      character: getSelectedOption('character', CHARACTER),
      department: getSelectedOption('department', DEPARTMENT),
      event: getSelectedOption('event', EVENT),
      illust: getSelectedOption('illust', ILLUST),
    }),
    [getSelectedOption]
  );

  // 필터 변경 핸들러
  const handleFilterChange = (key: string) => (option: DropdownOption) => {
    updateQueryParams({
      [key]: option.value === 'all' ? null : option.value,
      page: 1,
    });
  };

  // 전체 초기화
  const reset = () => {
    updateQueryParams({
      character: null,
      department: null,
      event: null,
      illust: null,
      page: 1,
    });
  };

  return (
    <div className={clsx('flex flex-wrap gap-1 md:gap-2', className)}>
      <IconButton
        icon="IC_Reset"
        variant="tertiary"
        size="sm"
        ariaLabel="전체 초기화"
        onClick={reset}
      />
      {FILTERS.map(({ key, options, placeholder }) => {
        const value = selectedValues[key as keyof typeof selectedValues];
        const isActive = value !== null;

        return (
          <Dropdown
            key={key}
            options={options}
            size="sm"
            value={value}
            onSelect={handleFilterChange(key)}
            placeholder={placeholder}
            variant={isActive ? 'primary' : 'tertiary'}
          />
        );
      })}
    </div>
  );
}

'use client';

import { Category, Location } from '@/data/restaurants';
import Button from '@/shared/ui/Button/Button';
import { Chip } from '@/shared/ui/Chip';
import IconButton from '@/shared/ui/IconButton/IconButton';

import { FILTER_GROUPS } from '../constants/filterOptions';

interface Props {
  selectedCategories: Category[];
  selectedLocations: Location[];
  selectedCount: number;
  onToggleCategory: (category: Category) => void;
  onToggleLocation: (location: Location) => void;
  onResetCategories: () => void;
  onResetLocations: () => void;
  onReset: () => void;
}

export default function FilterPanel({
  selectedCategories,
  selectedLocations,
  selectedCount,
  onToggleCategory,
  onToggleLocation,
  onResetCategories,
  onResetLocations,
  onReset,
}: Props) {
  const isSelected = (key: string, value: string) =>
    key === 'category'
      ? selectedCategories.includes(value as Category)
      : selectedLocations.includes(value as Location);

  const handleToggle = (key: string, value: string) => {
    if (key === 'category') onToggleCategory(value as Category);
    else onToggleLocation(value as Location);
  };

  const groupSelectedCount = (key: string) =>
    key === 'category' ? selectedCategories.length : selectedLocations.length;

  const handleResetGroup = (key: string) => {
    if (key === 'category') onResetCategories();
    else onResetLocations();
  };

  return (
    <div className="border-gray100 w-full rounded-xl border p-3">
      <div className="mb-3 flex items-center justify-end">
        <Button
          size="sm"
          variant="tertiary"
          icon="IC_Reset"
          label="초기화"
          disabled={selectedCount === 0}
          onClick={onReset}
        />
      </div>

      {/*
        라벨 · 그룹별 초기화 · 칩을 한 행에 둔다.
        fieldset/legend 는 legend 가 fieldset 의 첫 자식이어야 해서 같은 flex 행에 섞을 수 없다.
        대신 role="group" + aria-label 로 묶음의 의미를 유지한다.
      */}
      {FILTER_GROUPS.map(group => (
        <div
          key={group.key}
          role="group"
          aria-label={group.label}
          className="mb-2 flex flex-wrap items-center gap-1.5 last:mb-0"
        >
          <span className="font-label-sm text-gray600 mr-0.5">{group.label}</span>
          <IconButton
            size="sm"
            variant="tertiary"
            icon="IC_Reset"
            ariaLabel={`${group.label} 필터 초기화`}
            disabled={groupSelectedCount(group.key) === 0}
            onClick={() => handleResetGroup(group.key)}
          />
          {group.options.map(option => (
            <Chip
              key={option}
              label={option}
              selected={isSelected(group.key, option)}
              onClick={() => handleToggle(group.key, option)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

'use client';

import clsx from 'clsx';
import React from 'react';

import { style } from './Chip.style';

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

/**
 * 다중 선택 필터용 토글 칩.
 * Dropdown 은 단일 선택 전용이라 여러 개를 동시에 켜야 하는 필터에는 쓸 수 없다.
 */
const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { label, selected = false, disabled = false, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(style({ selected, disabled }), className)}
      {...rest}
    >
      {label}
    </button>
  );
});

export default Chip;

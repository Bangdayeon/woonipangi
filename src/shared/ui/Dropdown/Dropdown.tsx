'use client';

import { forwardRef, useState } from 'react';

import Button from '../Button/Button';
import { contentStyle, listStyle } from './Dropdown.style';
import { useDropdown } from './useDropdown';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  options: DropdownOption[];
  defaultSelected?: DropdownOption;
  size?: 'sm' | 'md' | 'lg';
  onSelect?: (option: DropdownOption) => void;
}
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { options, defaultSelected = options[0], size = 'sm', onSelect, ...rest },
  ref
) {
  const { isOpen, toggle, close } = useDropdown(ref as React.RefObject<HTMLDivElement>);
  const [selected, setSelected] = useState<DropdownOption | null>(
    defaultSelected ?? options[0] ?? null
  );

  const handleOptionClick = (option: DropdownOption) => {
    setSelected(option); // 선택 상태 업데이트
    onSelect?.(option); // 외부 콜백 호출
    close(); // 메뉴 닫기
  };

  return (
    <div ref={ref} className="relative inline-block" {...rest}>
      <Button
        label={selected?.label ?? '..'}
        icon={isOpen ? 'IC_DropUp' : 'IC_DropDown'}
        aria-expanded={isOpen}
        disabled={options.length === 0}
        aria-disabled={options.length === 0}
        size={size}
        variant="secondary"
        onClick={toggle}
      />
      {isOpen && options.length > 0 && (
        <ul className={contentStyle()} role="menu">
          <div className="">
            {options.map(option => (
              <li
                className={listStyle({ size })}
                key={option.value}
                onClick={() => handleOptionClick(option)}
                role="menuitem"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOptionClick(option);
                  }
                }}
              >
                {option.label}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
export default Dropdown;

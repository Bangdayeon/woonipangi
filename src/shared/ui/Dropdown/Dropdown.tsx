'use client';

import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';

import Button from '../Button/Button';
import { contentStyle, listStyle } from './Dropdown.style';
import { useDropdown } from './useDropdown';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  options: readonly DropdownOption[];
  value?: DropdownOption | null;
  placeholder?: string;
  defaultSelected?: DropdownOption;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  rounded?: 'md' | 'full';
  onSelect?: (option: DropdownOption) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  {
    options,
    value,
    placeholder,
    defaultSelected = options[0],
    size = 'md',
    variant = 'tertiary',
    rounded = 'full',
    onSelect,
    ...rest
  },
  externalRef
) {
  const isControlled = value !== undefined;

  const [internalSelected, setInternalSelected] = useState<DropdownOption | null>(
    defaultSelected ?? options[0] ?? null
  );

  const selected = isControlled ? value : internalSelected;

  const internalRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listId = useId();

  // value가 null이면 placeholder 표시, 아니면 label 표시
  const labelText = selected ? selected.label : (placeholder ?? '선택');

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;

      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef) {
        externalRef.current = node;
      }
    },
    [externalRef]
  );

  const { isOpen, toggle, close } = useDropdown(internalRef);

  useEffect(() => {
    if (isOpen) {
      const selectedIdx = options.findIndex(o => o.value === selected?.value);
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
    }
  }, [isOpen, options, selected?.value]);

  useEffect(() => {
    if (!isOpen || options.length === 0) return;

    const clamped = Math.min(Math.max(focusedIndex, 0), options.length - 1);
    itemRefs.current[clamped]?.focus();
  }, [isOpen, focusedIndex, options.length]);

  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      buttonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const handleOptionClick = (option: DropdownOption) => {
    if (!isControlled) {
      setInternalSelected(option);
    }
    onSelect?.(option);
    close();
  };

  return (
    <div ref={setRefs} className="relative inline-block" {...rest}>
      <Button
        ref={buttonRef}
        label={labelText}
        icon={isOpen ? 'IC_DropUp' : 'IC_DropDown'}
        aria-label={labelText}
        aria-expanded={isOpen}
        aria-controls={listId}
        disabled={options.length === 0}
        aria-disabled={options.length === 0}
        size={size}
        variant={variant}
        onClick={toggle}
        radius={rounded}
      />
      {isOpen && options.length > 0 && (
        <ul
          id={listId}
          className={contentStyle()}
          role="listbox"
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setFocusedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Home') {
              e.preventDefault();
              setFocusedIndex(0);
            } else if (e.key === 'End') {
              e.preventDefault();
              setFocusedIndex(options.length - 1);
            }
          }}
        >
          {options.map((option, idx) => (
            <li
              ref={el => {
                itemRefs.current[idx] = el;
              }}
              className={listStyle({ size })}
              key={option.value}
              onClick={() => handleOptionClick(option)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(option);
                }
              }}
              aria-selected={selected?.value === option.value}
              role="option"
              tabIndex={idx === focusedIndex ? 0 : -1}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
export default Dropdown;

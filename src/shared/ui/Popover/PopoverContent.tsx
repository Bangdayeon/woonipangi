'use client';

import { useOutsideDismiss } from '@/shared/utils/useOutsideDismiss';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { usePopover } from './PopoverContext';
import { usePopoverPosition } from './usePopoverPosition';

interface PopoverContentProps {
  children: (close: () => void) => React.ReactNode; // render props 패턴으로 close 함수를 전달
  popoverKey: string; // 어떤 Popover인지 구분하는 고유 키
  className?: string;
}

// Popover의 실제 내용을 표시하는 컴포넌트, Portal을 통해 body에 렌더링되며 Floating UI로 위치를 계산
const PopoverContent = ({ children, popoverKey, className }: PopoverContentProps) => {
  const { activeKey, anchorEl, placement, close } = usePopover();

  // 현재 이 Content가 활성화되어 있는지 확인
  const isActive = activeKey === popoverKey;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  // anchorEl이 변경될 때마다 ref 업데이트 (useEffect 내부에서 처리)
  useEffect(() => {
    anchorRef.current = anchorEl ?? null;
  }, [anchorEl]);

  // Floating UI를 사용한 위치 계산
  const { refs, floatingStyles } = usePopoverPosition(anchorEl ?? null, isActive, placement);

  // 외부 클릭 시 닫기 처리
  useOutsideDismiss([anchorRef, contentRef], {
    onDismiss: close,
    closeOnEsc: true,
    enabled: isActive, // 열려있을 때만 활성화
  });

  // 비활성 상태면 렌더링하지 않음
  if (!isActive || typeof document === 'undefined') return null;

  // Portal을 통해 body에 렌더링
  return createPortal(
    <div
      ref={node => {
        refs.setFloating(node);
        contentRef.current = node;
      }}
      style={floatingStyles}
      className={clsx(
        'border-gray100 z-50 m-1 overflow-hidden rounded-2xl border bg-white shadow-[0_1px_3px_1px_rgba(0,0,0,0.08),0_1px_5px_2px_rgba(0,0,0,0.02)]',
        className
      )}
      aria-modal="false"
      role="dialog"
      onClick={e => e.stopPropagation()}
    >
      {children(close)}
    </div>,
    document.body
  );
};

export default PopoverContent;

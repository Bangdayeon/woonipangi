'use client';

import { Placement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { useEffect } from 'react';

/**
 * Floating UI를 사용하여 Popover의 위치를 계산하는 커스텀 훅
 *
 * @param triggerRef - Popover가 기준으로 삼을 요소 (trigger)
 * @param isOpen - Popover가 열려있는지 여부 (열려있을 때만 위치 계산)
 * @param placement - Popover의 기본 표시 위치
 * @returns Floating UI의 refs와 스타일
 */
export const usePopoverPosition = (
  triggerRef: HTMLElement | null,
  isOpen: boolean,
  placement: Placement = 'bottom-start'
) => {
  const { refs, floatingStyles, update } = useFloating({
    placement,
    middleware: [
      offset(6), // 기준 요소로부터의 거리
      flip(), // 화면 공간에 맞춰 위아래로 뒤집기
      shift(), // 화면 밖으로 나가지 않도록 옆으로 밀어넣기
    ],
    whileElementsMounted: autoUpdate,
  });

  // Trigger 요소를 Floating UI에 연결
  useEffect(() => {
    refs.setReference(triggerRef);
  }, [triggerRef, refs]);

  // Popover가 열릴 때마다 위치 업데이트
  useEffect(() => {
    if (isOpen) update();
  }, [isOpen, update]);

  return { refs, floatingStyles };
};

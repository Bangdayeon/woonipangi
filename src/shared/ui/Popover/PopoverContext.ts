'use client';

import { Placement } from '@floating-ui/react-dom';
import { createContext, useContext } from 'react';

interface PopoverContextType {
  anchorEl?: HTMLElement | null; // Popover가 기준으로 삼을 요소 (Trigger)
  activeKey: string | null; // 현재 열려있는 Popover의 키
  placement: Placement; // Popover의 표시 위치
  close: () => void; // Popover를 닫는 함수
  open: (key: string, anchor: HTMLElement) => void; // Popover를 여는 함수
  toggle: (key: string, anchor: HTMLElement) => void; // Popover를 토글하는 함수
}

export const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

// Popover Context를 사용하기 위한 커스텀 훅
export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover는 PopoverProvider 내부에서만 사용해야합니다.');
  }

  return context;
};

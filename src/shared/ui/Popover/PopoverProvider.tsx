'use client';

import { Placement } from '@floating-ui/react-dom';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { PopoverContext } from './PopoverContext';

// Popover의 상태를 관리하고 Context를 제공하는 Provider 컴포넌트
const PopoverProvider = ({ children, placement }: PropsWithChildren<{ placement: Placement }>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // Trigger 요소
  const [activeKey, setActiveKey] = useState<string | null>(null); // 활성화된 Popover 키

  // Popover 열기
  const open = useCallback((key: string, anchor: HTMLElement) => {
    setActiveKey(key);
    setAnchorEl(anchor);
  }, []);

  // Popover 닫기
  const close = useCallback(() => {
    setActiveKey(null);
    setAnchorEl(null);
  }, []);

  // Popover 토글 (같은 키면 닫고, 다른 키면 열기)
  const toggle = useCallback(
    (key: string, anchor: HTMLElement) => {
      if (activeKey === key && anchorEl === anchor) close();
      else open(key, anchor);
    },
    [activeKey, anchorEl, close, open]
  );

  const value = useMemo(
    () => ({
      anchorEl,
      activeKey,
      placement,
      open,
      close,
      toggle,
    }),
    [anchorEl, activeKey, placement, open, close, toggle]
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};

export default PopoverProvider;

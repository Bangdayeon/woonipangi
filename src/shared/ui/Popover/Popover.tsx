'use client';

import { Placement } from '@floating-ui/react-dom';
import React from 'react';
import { ReactNode } from 'react';

import PopoverContent from './PopoverContent';
import PopoverProvider from './PopoverProvider';
import PopoverTrigger from './PopoverTrigger';

interface PopoverProps {
  children: ReactNode;
  placement?: Placement; // Popover의 기본 표시 위치
}

/**
 * @example
 * <Popover placement="bottom-start">
 *   <Popover.Trigger popoverKey="menu">
 *     <Button>메뉴 열기</Button>
 *   </Popover.Trigger>
 *   <Popover.Content popoverKey="menu">
 *     {close => <div>메뉴 내용</div>}
 *   </Popover.Content>
 * </Popover>
 */
const Popover = ({ children, placement = 'bottom-start' }: PopoverProps) => {
  return <PopoverProvider placement={placement}>{children}</PopoverProvider>;
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;

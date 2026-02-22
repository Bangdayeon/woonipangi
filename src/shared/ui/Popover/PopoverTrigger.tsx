'use client';

import {
  MouseEvent,
  MutableRefObject,
  ReactElement,
  Ref,
  cloneElement,
  useCallback,
  useRef,
} from 'react';

import { usePopover } from './PopoverContext';

// Trigger가 되는 컴포넌트가 가져야 할 최소한의 props
interface TriggerProps {
  ref?: Ref<HTMLElement>;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
  'aria-haspopup'?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | boolean;
  'aria-expanded'?: boolean;
}

interface PopoverTriggerProps {
  children: ReactElement<TriggerProps>; // ref와 onClick을 받을 수 있는 컴포넌트
  popoverKey: string; // 어떤 Popover를 제어할지 구분하는 키
  ariaLabel?: string;
  ariaHasPopup?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}

// children으로 받은 컴포넌트에 onClick과 ref를 주입
const PopoverTrigger = ({
  children,
  popoverKey,
  ariaLabel,
  ariaHasPopup = 'menu',
}: PopoverTriggerProps) => {
  const triggerRef = useRef<HTMLElement>(null);
  const { activeKey, toggle } = usePopover();

  // 현재 이 Trigger의 Popover가 열려있는지 확인 (key 상태 확인)
  const isActive = activeKey === popoverKey;

  const handleInteraction = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // 원래 children의 onClick이 있다면 실행
    children.props.onClick?.(e);

    // Popover 토글
    if (triggerRef.current) {
      toggle(popoverKey, triggerRef.current);
    }
  };

  // children의 ref를 안전하게 추출하고 타입 지정
  const childRef = children.props.ref as Ref<HTMLElement> | undefined;

  // ref callback을 직접 정의
  // 렌더링 시마다 새 함수가 생성되지만 ref는 실제 DOM 노드가 마운트/업데이트될 때만 호출됨
  const handleRef = useCallback(
    (node: HTMLElement | null) => {
      // triggerRef 업데이트
      triggerRef.current = node;

      // childRef가 있으면 전달
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef && 'current' in childRef) {
        // ref 객체인 경우 current 업데이트
        // ESLint는 ref.current 수정을 경고하지만, 이는 ref callback 내부에서 안전
        // eslint-disable-next-line react-hooks/immutability
        (childRef as MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [childRef]
  );

  return cloneElement(children, {
    ref: handleRef,
    onClick: handleInteraction,
    // 접근성 속성 추가
    'aria-haspopup': ariaHasPopup,
    'aria-expanded': isActive,
    'aria-label': ariaLabel || children.props['aria-label'],
  } as Partial<TriggerProps>);
};

export default PopoverTrigger;

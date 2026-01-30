'use client';

import { useOutsideDismiss } from '@/shared/utils/useOutsideDismiss';
import { MODAL_TYPE, useModalStore } from '@/stores/modalStore';
import clsx from 'clsx';
import { HTMLAttributes, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Divider from '../Divider/Divider';
import IconButton from '../IconButton/IconButton';
import { style } from './Modal.style';
import { useFocusTrap } from './useFocusTrap';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  type: keyof typeof MODAL_TYPE;
  ariaLabel: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { ariaLabel, className, children, type, ...rest },
  ref
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef<string>('');

  const { type: openType, close } = useModalStore();
  const [portalElement] = useState<HTMLElement | null>(() => {
    if (typeof window === 'undefined') return null;

    let portalDiv = document.getElementById('modal-root');
    if (!portalDiv) {
      portalDiv = document.createElement('div');
      portalDiv.id = 'modal-root';
      document.body.appendChild(portalDiv);
    }
    return portalDiv;
  });

  const { overlay, content, header, body } = style();

  const isOpen = openType === type;

  // 외부 클릭/ESC로 닫음
  useOutsideDismiss(contentRef, {
    onDismiss: close,
    closeOnEsc: true,
    enabled: isOpen,
  });

  useFocusTrap(isOpen, contentRef); // focustrap

  // 모달 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflowRef.current; // 기존 값(hidden, clip) 저장
    };
  }, [isOpen]);

  if (!isOpen || !portalElement) return null;

  return createPortal(
    <div
      ref={ref}
      className={overlay()}
      tabIndex={-1} // overlay는 포커스 불가능
      onClick={close} // overlay 클릭 시 닫기 (useOutsideDismiss와 중복이지만 명시적으로)
      aria-label={ariaLabel}
      aria-modal="true"
      role="dialog"
      {...rest}
    >
      <div
        ref={contentRef}
        className={clsx(content(), className)}
        onClick={e => e.stopPropagation()}
        role="document"
        tabIndex={-1} // content는 포커스 가능하게 설정 (폴백용)
      >
        <div className={header()}>
          <IconButton
            icon="IC_X"
            size="sm"
            variant="secondary"
            ariaLabel="모달 닫기 버튼"
            onClick={close}
          />
        </div>
        <Divider color="bg-gray200" />
        <div className={body()}>{children}</div>
      </div>
    </div>,
    portalElement
  );
});

export default Modal;

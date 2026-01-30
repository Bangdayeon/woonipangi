'use client';
import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive: boolean, ref: React.RefObject<HTMLElement | null>) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;

    const getFocusable = () =>
      element.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    const focusable = getFocusable();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // 이전 포커스 저장
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // 약간의 지연 후 포커스 (DOM이 완전히 렌더링된 후)
    requestAnimationFrame(() => {
      first.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      const active = document.activeElement as HTMLElement | null;

      // 포커스가 모달 밖에 있으면 강제 진입
      if (!element.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // element에 직접 리스너 등록 (캡처링 단계에서)
    element.addEventListener('keydown', handleKeyDown, true);

    return () => {
      element.removeEventListener('keydown', handleKeyDown, true);
      // 포커스 복원
      if (previousFocusRef.current) {
        requestAnimationFrame(() => {
          previousFocusRef.current?.focus();
        });
      }
    };
  }, [isActive, ref]);
};

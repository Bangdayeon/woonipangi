import { useCallback, useEffect, useState } from 'react';

export function useDropdown(ref: React.RefObject<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback으로 toggle/close를 메모이제이션하여 핸들러 안정화
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!ref) return;

    // 모바일 외부 클릭 처리
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current) return;
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    // ESC 키 처리
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref]);
  return { isOpen, toggle, close };
}

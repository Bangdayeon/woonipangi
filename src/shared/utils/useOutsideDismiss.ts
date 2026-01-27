import { useEffect } from 'react';

interface UseOutsideDismissOptions {
  onDismiss: () => void;
  closeOnEsc?: boolean;
  enabled?: boolean;
}

export function useOutsideDismiss<T extends HTMLElement | null>(
  ref: React.RefObject<T> | null,
  { onDismiss, closeOnEsc = true, enabled = true }: UseOutsideDismissOptions
) {
  useEffect(() => {
    if (!ref || !ref.current || !enabled) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        onDismiss();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onDismiss();
      }
    };

    // 즉시 등록 (rAF 제거)
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, onDismiss, closeOnEsc, enabled]);
}

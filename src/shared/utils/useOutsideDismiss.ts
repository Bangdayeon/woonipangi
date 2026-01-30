import { useEffect } from 'react';

interface UseOutsideDismissOptions {
  onDismiss: () => void;
  closeOnEsc?: boolean;
  enabled?: boolean;
}

/**
 * 외부 클릭 시 dismiss 처리를 위한 커스텀 훅
 * 여러 개의 ref를 받아서 모두 제외 대상으로 처리 가능
 */
export function useOutsideDismiss<T extends HTMLElement | null>(
  ref: React.RefObject<T> | React.RefObject<T>[] | null,
  { onDismiss, closeOnEsc = true, enabled = true }: UseOutsideDismissOptions
) {
  useEffect(() => {
    if (!enabled) return;

    // ref를 배열로 정규화
    const refs = Array.isArray(ref) ? ref : [ref];

    const onPointerDown = (e: PointerEvent) => {
      // 모든 ref를 확인해서 하나라도 클릭 대상을 포함하고 있으면 무시
      const isInside = refs.some(r => {
        return r && r.current && r.current.contains(e.target as Node);
      });

      if (!isInside) {
        onDismiss();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onDismiss();
      }
    };

    // ref.current가 null이어도 이벤트 리스너를 등록
    // 이벤트 핸들러 내부에서 ref.current를 체크
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, onDismiss, closeOnEsc, enabled]);
}

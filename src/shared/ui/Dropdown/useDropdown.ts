import { useOutsideDismiss } from '@/shared/utils/useOutsideDismiss';
import { useCallback, useState } from 'react';

export function useDropdown(ref: React.RefObject<HTMLDivElement | null>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutsideDismiss(ref, {
    onDismiss: close,
    closeOnEsc: true,
    enabled: isOpen, // 열려있을 때만 활성화
  });

  return { isOpen, toggle, close };
}

'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { ToastContainer } from './ToastContainer';
import { ToastContext } from './ToastContext';
import { CloseToastArgs, ShowToastArgs, Toast } from './toast.types';

const DEFAULT_DURATION = 3000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const idRef = useRef(0);

  const closeToast = useCallback(({ id }: CloseToastArgs) => {
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ message, type = 'success', duration = DEFAULT_DURATION }: ShowToastArgs) => {
      const toastId = ++idRef.current;

      setToasts(prev => [...prev, { id: toastId, message, type, duration }]);

      const timeoutId = setTimeout(() => {
        closeToast({ id: toastId });
      }, duration);
      timeoutsRef.current.set(toastId, timeoutId);
    },
    [closeToast]
  );

  useEffect(() => {
    const timeouts = timeoutsRef.current;

    return () => {
      timeouts.forEach(clearTimeout);
      timeouts.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}

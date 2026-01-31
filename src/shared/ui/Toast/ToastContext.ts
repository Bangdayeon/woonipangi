'use client';

import { createContext, useContext } from 'react';

import { CloseToastArgs, ShowToastArgs } from './toast.types';

export interface ToastContextValue {
  showToast: (args: ShowToastArgs) => void;
  closeToast: (args: CloseToastArgs) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
/**
 * @example
 * ```tsx
 * <button
 *   onClick={() =>
 *     showToast({
 *       message: '저장되었습니다',
 *       type: 'success',
 *       duration: 5000,
 *     })
 *   }
 * >
 *   토스트 띄우기
 * </button>
 * ```
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import SVGIcon from '../Icon/SVGIcon';
import IconButton from '../IconButton/IconButton';
import { style } from './Toast.style';
import { useToast } from './ToastContext';
import { Toast, ToastType } from './toast.types';

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  const { containerStyle, toastStyle } = style();
  const { closeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <SVGIcon icon="IC_Success" className="text-green600 h-8 w-8" />;
      case 'error':
        return <SVGIcon icon="IC_Error" className="text-red500 h-8 w-8" />;
      case 'warn':
        return <SVGIcon icon="IC_Warning" className="text-yellow500 h-8 w-8" />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className={containerStyle()} role="alert" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className={toastStyle({ variant: toast.type })}
          >
            <div className="flex w-full items-center gap-2">
              <div className="shrink-0">{renderToastIcon(toast.type)}</div>

              <div className="min-w-0 flex-1 text-sm wrap-break-word">{toast.message}</div>

              <div className="shrink-0">
                <IconButton
                  icon="IC_X"
                  ariaLabel="토스트 닫기"
                  variant="secondary"
                  size="sm"
                  onClick={() => closeToast({ id: toast.id })}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

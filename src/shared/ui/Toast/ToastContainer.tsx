'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

import SVGIcon from '../Icon/SVGIcon';
import IconButton from '../IconButton/IconButton';
import { style } from './Toast.style';
import { useToast } from './ToastContext';
import { Toast, ToastType } from './toast.types';

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  const { containerStyle, toastStyle } = style();
  const { closeToast } = useToast();

  if (typeof document === 'undefined') return null;

  const renderToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <SVGIcon icon="IC_Success" className="text-green600 h-8 w-8" />;
      case 'error':
        return <SVGIcon icon="IC_Error" className="text-red500 h-8 w-8" />;
      case 'warn':
        return <SVGIcon icon="IC_Warning" className="text-yellow500 mb-1 ml-1 h-8 w-8" />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className={containerStyle()} role="alert" aria-atomic="true" aria-live="polite">
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
            <div className="flex items-center gap-1">
              {renderToastIcon(toast.type)}
              {toast.message}
            </div>
            <IconButton
              icon="IC_X"
              ariaLabel="토스트 닫기"
              variant="secondary"
              size="sm"
              onClick={() => closeToast({ id: toast.id })}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

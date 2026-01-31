import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    containerStyle: 'fixed bottom-10 left-1/2 z-50 -translate-x-1/2 space-y-2',
    toastStyle: 'flex justify-between gap-10 rounded-full border-2 bg-white px-2 py-2 shadow',
  },
  variants: {
    variant: {
      success: {
        toastStyle: 'border-green600',
      },
      error: {
        toastStyle: 'border-red500',
      },
      warn: {
        toastStyle: 'border-yellow500',
      },
    },
  },
});

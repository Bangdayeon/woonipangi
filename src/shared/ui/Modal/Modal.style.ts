import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]',
    content:
      'bg-gray50 custom-scrollbar relative h-auto w-auto overflow-y-auto rounded-2xl shadow-lg',
    header: 'flex w-full items-center justify-end px-3 py-3',
    body: '',
  },
});

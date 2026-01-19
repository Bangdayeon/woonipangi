import { tv } from 'tailwind-variants';

export const contentStyle = tv({
  base: 'custom-scrollbar absolute z-10 my-1 max-h-40 max-w-40 divide-gray-900 overflow-hidden overflow-y-auto rounded-md bg-white text-ellipsis whitespace-nowrap text-gray-900 shadow-md',
});

export const listStyle = tv({
  base: 'w-full cursor-pointer truncate transition-colors hover:bg-gray-200',
  variants: {
    size: {
      sm: 'font-label-sm px-3 py-1.5',
      md: 'font-label-md px-4 py-2',
      lg: 'font-label-lg px-5 py-3',
    },
  },
});

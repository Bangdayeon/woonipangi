import { tv } from 'tailwind-variants';

export const contentStyle = tv({
  base: 'custom-scrollbar divide-gray900 text-gray900 absolute z-10 my-1 max-h-40 max-w-40 overflow-hidden overflow-y-auto rounded-md bg-white text-ellipsis whitespace-nowrap shadow-md',
});

export const listStyle = tv({
  base: 'hover:bg-gray200 w-full cursor-pointer truncate transition-colors',
  variants: {
    size: {
      sm: 'font-label-sm px-3 py-1.5',
      md: 'font-label-md px-4 py-2',
      lg: 'font-label-lg px-5 py-3',
    },
  },
});

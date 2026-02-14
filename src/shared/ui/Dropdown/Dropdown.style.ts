import { tv } from 'tailwind-variants';

export const contentStyle = tv({
  base: 'custom-scrollbar divide-gray900 text-gray900 border-gray50 absolute z-10 my-1 max-h-40 max-w-40 divide-y overflow-hidden overflow-y-auto rounded-md border bg-white text-ellipsis whitespace-nowrap shadow-md',
});

export const listStyle = tv({
  base: 'hover:bg-gray100 w-full cursor-pointer truncate transition-colors duration-100',
  variants: {
    size: {
      sm: 'font-body-sm px-3 py-1.5',
      md: 'font-body-md px-4 py-2',
      lg: 'font-body-lg px-5 py-3',
    },
  },
});

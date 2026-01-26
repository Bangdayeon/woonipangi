import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'block rounded-full transition-colors duration-150',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
});

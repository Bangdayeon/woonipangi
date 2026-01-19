import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full whitespace-nowrap transition-all duration-150',
  variants: {
    variant: {
      primary: 'bg-btn-primary border-btn-primary text-btn-primary border',
      secondary: 'bg-btn-secondary border-btn-secondary text-btn-secondary border',
      tertiary: 'bg-btn-tertiary border-btn-tertiary text-btn-tertiary border',
    },
    radius: {
      md: 'rounded-lg',
      full: 'rounded-full',
    },
    size: {
      sm: 'font-label-sm h-8 px-3',
      md: 'font-label-md h-10 px-4',
      lg: 'font-label-lg h-12 px-5',
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed',
      false: '',
    },
  },
});

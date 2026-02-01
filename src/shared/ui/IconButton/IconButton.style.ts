import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'flex cursor-pointer items-center justify-center rounded-full transition-all duration-150',
  variants: {
    variant: {
      primary: 'bg-btn-primary border-btn-primary text-btn-primary border',
      secondary: 'bg-btn-secondary border-btn-secondary text-btn-secondary border',
      ghost: 'text-gray600 hover:text-gray900',
    },
    size: {
      sm: 'h-8 w-8',
      md: 'h-9 w-9',
      lg: 'h-10 w-10',
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed opacity-30',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'ghost',
      size: 'sm',
      class: 'h-5 w-5',
    },
    {
      variant: 'ghost',
      size: 'md',
      class: 'h-6 w-6',
    },
    {
      variant: 'ghost',
      size: 'lg',
      class: 'h-7 w-7',
    },
  ],
});

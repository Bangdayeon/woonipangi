import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'font-label-sm inline-flex h-8 cursor-pointer items-center justify-center rounded-full border px-3 whitespace-nowrap transition-all duration-150',
  variants: {
    selected: {
      true: 'bg-blue200 border-blue200 text-gray800 hover:bg-blue100 hover:border-blue100',
      false: 'border-gray300 text-gray700 hover:border-gray400 hover:bg-gray50 bg-white',
    },
    disabled: {
      true: 'pointer-events-none opacity-40',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  },
});

import { tv } from 'tailwind-variants';

export const choiceStyle = tv({
  base: 'w-full cursor-pointer rounded-xl border px-4 py-4 text-left transition-all duration-150 md:px-5 md:py-5',
  variants: {
    selected: {
      true: 'border-blue300 bg-blue50 text-gray900',
      false: 'border-gray200 text-gray800 hover:border-blue200 hover:bg-blue50/50 bg-white',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

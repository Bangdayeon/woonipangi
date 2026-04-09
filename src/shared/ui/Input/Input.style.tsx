import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    containerStyle: 'relative flex w-full min-w-0',
    inputStyle: `border-gray200 md:text-md text-gray800 placeholder-gray400 placeholder-opacity-100 focus:border-gray600 focus:ring-gray600 h-10 w-full min-w-0 flex-1 rounded-full border pr-4 pl-9 text-base transition-all duration-100 focus:ring-1 focus:outline-none md:h-12 md:pl-11`,
    iconStyle: 'text-gray700 absolute top-1/2 left-3 -translate-y-1/2 md:left-4',
  },
});

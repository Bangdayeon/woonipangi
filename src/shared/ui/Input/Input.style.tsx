import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    containerStyle: 'relative flex',
    inputStyle: `border-gray200 text-md text-gray800 placeholder-gray400 placeholder-opacity-100 focus:border-gray400 h-12·flex-1·rounded-full·border·pr-4 pl-11·transition-all duration-100 focus:outline-none`,
    iconStyle: 'text-gray700 absolute top-1/2 left-4 -translate-y-1/2',
  },
});

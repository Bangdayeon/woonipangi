import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    container: 'flex items-center',
    button: `inline-flex h-10 w-10 items-center justify-center border-b-2 border-transparent leading-none text-gray-400 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:hover:cursor-default`,
    active: 'border-b-blue-500 font-bold text-gray-900',
    arrowButton: `text-[0px] text-gray-900 disabled:text-gray-400 [&>svg]:block [&>svg]:shrink-0 [&>svg]:translate-y-[1px]`,
    arrowIcon: 'h-4 w-4',
  },
});

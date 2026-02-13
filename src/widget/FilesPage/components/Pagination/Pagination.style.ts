import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    container: 'flex items-center gap-2',
    button: `text-gray400 inline-flex h-10 w-10 items-center justify-center border-b-2 border-transparent leading-none hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:hover:cursor-default`,
    active: 'bg-blue500 border-b-blue500 font-bold text-white',
    arrowButton: `text-gray900 text-[0px] [&>svg]:block [&>svg]:shrink-0 [&>svg]:translate-y-[1px]`,
    arrowIcon: 'h-4 w-4',
  },
});

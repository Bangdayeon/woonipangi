import IC_Account from '@/assets/icons/ic_account.svg';
import IC_DropDown from '@/assets/icons/ic_arrow_drop_down.svg';
import IC_DropUp from '@/assets/icons/ic_arrow_drop_up.svg';

export const IconMap = {
  IC_Account,
  IC_DropDown,
  IC_DropUp,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
} as const;

export type IconSizeTypes = keyof typeof IconSizes;

export const buttonSizeMap = {
  sm: 'sm',
  md: 'lg',
  lg: 'xl',
} as const;

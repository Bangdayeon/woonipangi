import IC_Account from '@/assets/icons/ic_account.svg';
import IC_Arrow_Back from '@/assets/icons/ic_arrow_back.svg';
import IC_Arrow_Down from '@/assets/icons/ic_arrow_down.svg';
import IC_DropDown from '@/assets/icons/ic_arrow_drop_down.svg';
import IC_DropUp from '@/assets/icons/ic_arrow_drop_up.svg';
import IC_Arrow_Next from '@/assets/icons/ic_arrow_next.svg';
import IC_Bookmark from '@/assets/icons/ic_bookmark.svg';
import IC_Download from '@/assets/icons/ic_download.svg';
import IC_Error from '@/assets/icons/ic_error.svg';
import IC_Like_Off from '@/assets/icons/ic_favorite_off.svg';
import IC_Like_On from '@/assets/icons/ic_favorite_on.svg';
import IC_Image_Folder from '@/assets/icons/ic_image_folder.svg';
import IC_Instagram from '@/assets/icons/ic_instagram.svg';
import IC_Mail from '@/assets/icons/ic_mail.svg';
import IC_Search from '@/assets/icons/ic_search.svg';
import IC_Success from '@/assets/icons/ic_success.svg';
import IC_Warning from '@/assets/icons/ic_warning.svg';
import IC_X from '@/assets/icons/ic_x.svg';
import IC_Arrow_Up from '@/assets/icons/icon/ic_arrow_up.svg';

export const IconMap = {
  IC_Account,
  IC_Arrow_Back,
  IC_Arrow_Down,
  IC_Arrow_Up,
  IC_DropDown,
  IC_DropUp,
  IC_Arrow_Next,
  IC_Bookmark,
  IC_Download,
  IC_Error,
  IC_Instagram,
  IC_Image_Folder,
  IC_Like_Off,
  IC_Like_On,
  IC_Mail,
  IC_Search,
  IC_Success,
  IC_Warning,
  IC_X,
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

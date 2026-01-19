import React from 'react';

import { IconMap, IconMapTypes, IconSizeTypes, IconSizes } from './icon';

export interface SVGIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height' | 'viewBox'
> {
  icon: IconMapTypes;
  size?: IconSizeTypes;
}

type IconModule =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | {
      default: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    };

const SVGIcon: React.FC<SVGIconProps> = ({ icon, size = 'lg', ...props }) => {
  const iconModule = IconMap[icon] as IconModule | unknown;

  if (!iconModule) return null;

  // iconModule이 객체인 경우 .default 확인
  const Icon =
    typeof iconModule === 'object' && 'default' in iconModule ? iconModule.default : iconModule;

  // 여전히 함수/컴포넌트가 아니면 null 반환
  if (typeof Icon !== 'function') {
    console.error(`Icon ${icon} is not a valid component:`, Icon);
    return null;
  }

  const IconComponent = Icon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  return <IconComponent {...props} width={IconSizes[size]} height={IconSizes[size]} />;
};

export default SVGIcon;

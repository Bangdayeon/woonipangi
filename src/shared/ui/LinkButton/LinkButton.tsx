import Button, { ButtonProps } from '@/shared/ui/Button/Button';
import { getSafeUrl } from '@/shared/utils/getSafeUrl';
import Link from 'next/link';
import React from 'react';

import SVGIcon from '../Icon/SVGIcon';
import { buttonSizeMap } from '../Icon/icon';

interface LinkButtonProps extends ButtonProps {
  href: string;
  /** 아이콘을 라벨 뒤에 두고 싶을 때. 예: '이번주 메뉴 >' */
  iconPosition?: 'left' | 'right';
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { href, icon, iconPosition = 'left', size = 'md', variant, radius, className, label, ...props },
    ref
  ) => {
    if (!icon && !label)
      console.error('LinkButton: Either icon or label should be provided for accessibility');

    const safeUrl = getSafeUrl(href);
    const isExternal = /^https?:\/\//i.test(safeUrl);
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    const iconNode = icon ? <SVGIcon icon={icon} size={buttonSizeMap[size]} /> : null;

    return (
      <Button
        asChild
        size={size}
        variant={variant}
        radius={radius}
        className={className}
        {...props}
      >
        <Link ref={ref} href={safeUrl} {...linkProps} className="flex items-center gap-1">
          {iconPosition === 'left' && iconNode}
          <span className={icon ? (iconPosition === 'left' ? 'pr-1' : 'pl-1') : ''}>{label}</span>
          {iconPosition === 'right' && iconNode}
        </Link>
      </Button>
    );
  }
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;

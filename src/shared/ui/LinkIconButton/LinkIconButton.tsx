import IconButton, { IconButtonProps } from '@/shared/ui/IconButton/IconButton';
import { getSafeUrl } from '@/shared/utils/getSafeUrl';
import Link from 'next/link';
import React from 'react';

import SVGIcon from '../Icon/SVGIcon';
import { buttonSizeMap } from '../Icon/icon';

interface LinkIconButtonProps extends Omit<IconButtonProps, 'ariaLabel'> {
  href: string;
  ariaLabel: string;
}

const LinkIconButton = React.forwardRef<HTMLAnchorElement, LinkIconButtonProps>(
  ({ href, icon, size = 'md', variant, ariaLabel, className, ...props }, ref) => {
    if (!icon)
      console.error('LinkIconButton: Either icon or label should be provided for accessibility');

    const safeUrl = getSafeUrl(href);
    const isExternal = /^https?:\/\//i.test(safeUrl);
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
      <IconButton
        asChild
        size={size}
        variant={variant}
        icon={icon}
        ariaLabel={ariaLabel}
        className={className}
        {...props}
      >
        <Link ref={ref} href={safeUrl} {...linkProps}>
          <SVGIcon icon={icon} size={buttonSizeMap[size]} />
        </Link>
      </IconButton>
    );
  }
);

LinkIconButton.displayName = 'LinkIconButton';
export default LinkIconButton;

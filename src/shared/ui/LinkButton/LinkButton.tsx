import Button, { ButtonProps } from '@/shared/ui/Button/Button';
import { getSafeUrl } from '@/shared/utils/getSafeUrl';
import Link from 'next/link';
import React from 'react';

import SVGIcon from '../Icon/SVGIcon';
import { buttonSizeMap } from '../Icon/icon';

interface LinkButtonProps extends ButtonProps {
  href: string;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ href, icon, size = 'md', variant, radius, className, label, ...props }, ref) => {
    if (!icon && !label)
      console.error('LinkButton: Either icon or label should be provided for accessibility');

    const safeUrl = getSafeUrl(href);
    const isExternal = /^https?:\/\//i.test(safeUrl);
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

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
          {icon && <SVGIcon icon={icon} size={buttonSizeMap[size]} />}
          <span className={icon ? 'pr-1' : ''}>{label}</span>
        </Link>
      </Button>
    );
  }
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;

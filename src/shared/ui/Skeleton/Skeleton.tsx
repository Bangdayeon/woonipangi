'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import './Skeleton.style.css';

interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  className: string;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={clsx(
        'relative isolate overflow-hidden text-transparent select-none',
        'skeleton',
        className
      )}
      {...rest}
    />
  );
});

Skeleton.displayName = 'Skeleton';
export default Skeleton;

'use client';

import { Restaurant } from '@/data/restaurants';
import clsx from 'clsx';
import Image from 'next/image';

import { CATEGORY_ICONS } from '../constants/filterOptions';

/** 실제 렌더 크기. next/image 에 넘길 픽셀값과 아이콘 크기를 함께 묶어둔다. */
const SIZES = {
  sm: { px: 56, box: 'h-14 w-14', icon: 'text-2xl' },
  lg: { px: 120, box: 'h-30 w-30', icon: 'text-4xl' },
} as const;

interface Props {
  restaurant: Restaurant;
  size: keyof typeof SIZES;
  className?: string;
}

/**
 * 밥집 사진. 아직 사진이 없는 집은 종류 아이콘이 든 회색 박스로 대체한다.
 * 사진은 하나씩 채워 나가는 것이라 두 상태가 한 화면에 섞여도 어색하지 않아야 한다.
 */
export default function RestaurantThumbnail({ restaurant, size, className }: Props) {
  const { px, box, icon } = SIZES[size];
  const shape = clsx('shrink-0 rounded-2xl', box, className);

  if (restaurant.image) {
    return (
      <Image
        src={restaurant.image}
        alt=""
        width={px}
        height={px}
        className={clsx(shape, 'object-cover')}
      />
    );
  }

  return (
    <div
      className={clsx(shape, 'bg-gray100 flex items-center justify-center', icon)}
      aria-hidden="true"
    >
      {CATEGORY_ICONS[restaurant.categories[0]]}
    </div>
  );
}

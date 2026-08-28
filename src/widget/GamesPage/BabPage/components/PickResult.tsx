'use client';

import { Restaurant } from '@/data/restaurants';
import Button from '@/shared/ui/Button/Button';
import { getSafeUrl } from '@/shared/utils/getSafeUrl';
import { AnimatePresence, motion } from 'framer-motion';

import BabShareButton from './BabShareButton';
import RestaurantThumbnail from './RestaurantThumbnail';

interface Props {
  restaurant: Restaurant;
  /** 뽑는 중일 때 이름 자리에 스쳐 지나갈 후보 이름. 끝나면 null. */
  rollingName?: string | null;
}

export default function PickResult({ restaurant, rollingName = null }: Props) {
  const isRolling = rollingName !== null;

  return (
    <section
      className="flex flex-col items-center text-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        animate={isRolling ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
        transition={isRolling ? { duration: 0.28, repeat: Infinity } : { duration: 0.2 }}
      >
        <RestaurantThumbnail restaurant={restaurant} size="lg" />
      </motion.div>

      <h2 className="font-title-md mt-4 min-h-8">
        {isRolling ? (
          <span className="text-gray400">{rollingName}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={restaurant.id}
              className="inline-block"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {restaurant.name}
            </motion.span>
          </AnimatePresence>
        )}
      </h2>

      <div
        className={
          isRolling
            ? 'pointer-events-none flex flex-col items-center opacity-30 transition-opacity'
            : 'flex flex-col items-center opacity-100 transition-opacity'
        }
      >
        <ul className="mt-2 flex flex-wrap justify-center gap-1">
          {[restaurant.location, ...restaurant.categories].map(badge => (
            <li key={badge} className="bg-blue50 text-gray700 font-label-xs rounded-full px-2 py-1">
              {badge}
            </li>
          ))}
        </ul>

        <p className="font-body-md text-gray700 mt-3 whitespace-pre-wrap">
          {restaurant.description}
        </p>

        <div className="mt-4 flex gap-2">
          <Button asChild variant="primary">
            <a href={getSafeUrl(restaurant.mapUrl)} target="_blank" rel="noopener noreferrer">
              지도에서 보기
            </a>
          </Button>
          <BabShareButton restaurant={restaurant} />
        </div>
      </div>
    </section>
  );
}

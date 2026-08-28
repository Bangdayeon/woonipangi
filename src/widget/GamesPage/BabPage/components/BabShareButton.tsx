'use client';

import { Restaurant } from '@/data/restaurants';
import Button from '@/shared/ui/Button/Button';
import { useToast } from '@/shared/ui/Toast';
import { useState } from 'react';

interface Props {
  restaurant: Restaurant;
}

const buildShareText = (restaurant: Restaurant) =>
  `오늘 밥은 ${restaurant.name}! 🍚\n${restaurant.location} · ${restaurant.categories.join(', ')}`;

/**
 * 뽑은 결과를 문장 그대로 공유한다.
 * 링크를 보내면 받는 쪽이 눌러야 어디인지 알 수 있어서, 텍스트만 넘긴다.
 */
export default function BabShareButton({ restaurant }: Props) {
  const [isSharing, setIsSharing] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    if (isSharing) return;

    const text = buildShareText(restaurant);

    try {
      setIsSharing(true);

      if (navigator.share) {
        await navigator.share({ text });
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast({ message: '복사했어요!', type: 'success' });
        return;
      }

      showToast({ message: '공유를 지원하지 않는 브라우저예요.', type: 'warn' });
    } catch (error: unknown) {
      // 공유 시트를 그냥 닫은 경우는 실패가 아니다.
      if (error instanceof Error && error.name === 'AbortError') return;
      console.error('밥집 공유 실패:', error);
      showToast({ message: '공유하지 못했어요.', type: 'error' });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      variant="tertiary"
      label={isSharing ? '공유하는 중...' : '공유하기'}
      disabled={isSharing}
      onClick={handleShare}
    />
  );
}

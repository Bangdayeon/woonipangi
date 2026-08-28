'use client';

import Button from '@/shared/ui/Button/Button';
import { useToast } from '@/shared/ui/Toast';
import { useState } from 'react';

interface Props {
  title: string;
  text: string;
}

export default function QuizShareButton({ title, text }: Props) {
  const [isSharing, setIsSharing] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    if (isSharing) return;

    // BASE_URL은 서버 전용 환경 변수라 클라이언트에서 읽을 수 없다.
    // 렌더 중 window 접근은 SSR을 깨뜨리므로 핸들러 안에서만 읽는다.
    const url = window.location.href;

    try {
      setIsSharing(true);

      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast({ message: '링크를 복사했어요!', type: 'success' });
        return;
      }

      showToast({ message: '링크 복사를 지원하지 않는 브라우저예요.', type: 'warn' });
    } catch (error: unknown) {
      // 사용자가 공유 시트를 닫은 경우는 실패가 아니다.
      if (error instanceof Error && error.name === 'AbortError') return;
      console.error('결과 공유 실패:', error);
      showToast({ message: '링크를 복사하지 못했어요.', type: 'error' });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      variant="secondary"
      label={isSharing ? '공유하는 중...' : '결과 링크 복사'}
      disabled={isSharing}
      onClick={handleShare}
    />
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export function useSafeBack(fallbackPath = '/') {
  const router = useRouter();

  // 브라우저 환경에서 히스토리가 존재하는지 즉시 확인 (초기 렌더링 시 계산)
  const canGoBack = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.history.length > 1;
    }
    return false;
  }, []);

  const safeBack = () => {
    if (canGoBack) {
      // Next.js router.back()을 사용하면 좀 더 프레임워크 친화적입니다.
      router.back();
    } else {
      // 히스토리가 없는 경우 폴백 경로로 이동
      router.push(fallbackPath);
    }
  };

  return safeBack;
}

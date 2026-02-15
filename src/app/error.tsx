'use client';

import LinkButton from '@/shared/ui/LinkButton/LinkButton';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error; // 에러 객체
  reset: () => void; // 에러 리셋
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-gray-900">문제가 발생했습니다</h2>
      <p className="text-gray-600">{error.message || '알 수 없는 문제가 발생했습니다.'}</p>
      <LinkButton label="메인 페이지로 돌아가기" href="/" onClick={() => reset()} />
    </div>
  );
}

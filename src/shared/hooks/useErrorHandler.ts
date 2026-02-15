import { useState } from 'react';

export default function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = async (callback: () => void | Promise<void>) => {
    try {
      setError(null); // 에러 초기화
      await callback();
    } catch (err) {
      console.error('에러 발생:', err);

      // 에러 메시지 추출
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';

      setError(errorMessage);

      // 3초 후 자동으로 에러 메시지 제거
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const clearError = () => setError(null);

  return { handleError, error, clearError };
}

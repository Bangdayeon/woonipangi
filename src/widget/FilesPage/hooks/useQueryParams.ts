import { useCallback } from 'react';

interface QueryParams {
  [key: string]: string | number | null | undefined;
}

/**
 * 브라우저의 URL 쿼리 스트링 관리 훅
 * @returns `updateQueryParams` 함수를 포함한 객체 반환
 * @example
 * ```tsx
 * const { updateQueryParams } = useQueryParams();
 * // 파라미터 추가 및 수정
 * updateQueryParams({ page: 2, search: 'hello' });
 * // 파라미터 삭제
 * updateQueryParams({ filter: null });
 * ```
 */
export function useQueryParams() {
  /**
   * 새로운 파라미터를 기존 URL 쿼리 스트링과 병합/수정
   * @param newParams - 업데이트할 파라미터들이 담긴 객체
   * @description
   * 1. 현재 URL의 파라미터를 유지하면서 전달받은 값만 수정
   * 2. 값이 null, undefined, 혹은 빈 문자열('')인 경우 해당 키를 URL에서 삭제
   * 3. window.history.pushState를 사용하여 페이지 새로고침 없이 주소창만 변경
   */
  const updateQueryParams = useCallback((newParams: QueryParams) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    // 쿼리 스트링이 있으면 '?', 없으면 빈 문자열로 URL 구성
    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.pushState({}, '', newUrl);
    // PopStateEvent 수동 디스패치 제거 (Next.js 및 브라우저 표준 준수)
  }, []);

  return { updateQueryParams };
}

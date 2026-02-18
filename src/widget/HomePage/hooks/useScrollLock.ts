import { useEffect } from 'react';

/**
 * 모바일/태블릿 환경에서 스크롤 및 스크롤바 UI를 제어하는 훅
 * - 데스크톱(1024px 이상)에서는 항상 스크롤 해제 상태 유지
 * - 모바일/태블릿에서는 isLocked 상태에 따라 overflow 제어
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const updateScrollState = () => {
      const isMobileOrTablet = window.innerWidth < 1024;

      // 데스크톱은 무조건 해제
      if (!isMobileOrTablet) {
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.touchAction = '';
        body.classList.remove('no-scrollbar');
        return;
      }

      // 모바일/태블릿: 잠금 상태일 때만 overflow hidden
      if (isLocked) {
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.touchAction = 'pan-x pan-y pinch-zoom';
        body.classList.add('no-scrollbar');
      } else {
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.touchAction = '';
        body.classList.remove('no-scrollbar');
      }
    };

    updateScrollState();
    window.addEventListener('resize', updateScrollState);

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.classList.remove('no-scrollbar');
      window.removeEventListener('resize', updateScrollState);
    };
  }, [isLocked]);
}

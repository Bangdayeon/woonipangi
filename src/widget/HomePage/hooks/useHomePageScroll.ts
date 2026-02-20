import { type RefObject, useEffect, useRef, useState } from 'react';

import { useScrollLock } from './useScrollLock';

interface UseHomePageScrollReturn {
  isLocked: boolean; // mobile, tablet에서 스크롤 잠금 여부
  showScrollToBottomBtn: boolean; // "아래로 이동 버튼" 표시 여부
  showScrollToTopBtn: boolean; // "상단 이동 버튼" 표시 여부
  nextSectionRef: RefObject<HTMLElement | null>; // "아래로 이동 버튼" 클릭 시 스크롤할 다음 섹션
  handleScrollToBottom: () => void; // 다음 섹션으로 스크롤할 시, 잠금 해제
  handleScrollToTop: () => void; // 페이지 최상단으로 스크롤
}

// 홈페이지의 스크롤 관련 모든 상태와 핸들러를 관리하는 훅
export function useHomePageScroll(): UseHomePageScrollReturn {
  // 초기 상태를 스크롤 위치에 따라 결정 (뒤로가기 대응)
  const [isLocked, setIsLocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY <= 10;
    }
    return true;
  });
  const [showScrollToBottomBtn, setShowScrollToBottomBtn] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY <= 10;
    }
    return true;
  });
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 10;
    }
    return false;
  });

  const nextSectionRef = useRef<HTMLElement>(null);
  const justUnlockedRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const relockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // isLocked 최신값을 스크롤 이벤트 핸들러에서 참조하기 위한 ref
  const isLockedRef = useRef(isLocked);

  // isLocked 상태 변경 시 ref도 동기화
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // 모바일/태블릿 스크롤 잠금 적용
  useScrollLock(isLocked);

  // 실제 스크롤 발생 시 로직
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isAtTop = currentY <= 10;

      setShowScrollToBottomBtn(isAtTop);
      setShowScrollToTopBtn(!isAtTop);

      // 최상단이 아닐 때는 무조건 잠금을 해제 (뒤로가기 등으로 중간 위치 진입 시 대응)
      if (!isAtTop && isLockedRef.current) {
        setIsLocked(false);
      }

      // 모바일 환경에서 '최상단' 도달 시에만 다시 잠금
      if (
        window.innerWidth < 1024 &&
        currentY <= 1 &&
        !isLockedRef.current &&
        !justUnlockedRef.current
      ) {
        setIsLocked(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // setTimeout cleanup
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimerRef.current);
      clearTimeout(relockTimerRef.current);
    };
  }, []);

  /**
   * 아래로 이동 버튼 클릭 핸들러
   * - 잠금 해제 후 다음 섹션으로 스크롤
   * - justUnlockedRef를 통해 스크롤 완료 전 relock 방지
   */
  const handleScrollToBottom = () => {
    clearTimeout(scrollTimerRef.current); // 기존 타이머 정리하여 relock 방지
    clearTimeout(relockTimerRef.current);

    setIsLocked(false);
    justUnlockedRef.current = true;

    scrollTimerRef.current = setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      relockTimerRef.current = setTimeout(() => {
        justUnlockedRef.current = false;
      }, 500);
    }, 0);
  };

  /** 위로 이동 버튼 클릭 핸들러 - 페이지 최상단으로 부드럽게 스크롤 */
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    isLocked,
    showScrollToBottomBtn,
    showScrollToTopBtn,
    nextSectionRef,
    handleScrollToBottom,
    handleScrollToTop,
  };
}

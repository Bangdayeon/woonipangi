import { type RefObject, useEffect, useRef, useState } from 'react';

interface UseHomePageScrollReturn {
  showScrollToBottomBtn: boolean; // "아래로 이동 버튼" 표시 여부
  showScrollToTopBtn: boolean; // "상단 이동 버튼" 표시 여부
  nextSectionRef: RefObject<HTMLElement | null>; // 3D 섹션 다음에 올 섹션
  handleScrollToBottom: () => void; // 다음 구간으로 스크롤
  handleScrollToTop: () => void; // 페이지 최상단으로 스크롤
}

/** 문서 기준 절대 top. offsetParent 영향을 받지 않는다. */
const docTop = (el: HTMLElement | null) =>
  el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;

/**
 * 홈페이지의 스크롤 버튼 상태와 핸들러를 관리하는 훅.
 *
 * 예전에는 전역 overflow:hidden 으로 페이지를 잠갔지만, 3D 섹션이 두 번째로
 * 내려가면서 "페이지 최상단" 기준이 성립하지 않게 되었다. 지금은 3D 캔버스가
 * touch-action:none 으로 스스로 터치를 잡고, 이 훅은 그 구간을 빠져나갈
 * 탈출 버튼만 관리한다.
 */
export function useHomePageScroll(
  threeSectionRef: RefObject<HTMLElement | null>
): UseHomePageScrollReturn {
  const nextSectionRef = useRef<HTMLElement>(null);

  // SSR 과 어긋나지 않도록 false 로 시작하고 마운트 후 교정한다.
  const [showScrollToBottomBtn, setShowScrollToBottomBtn] = useState(false);
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const y = window.scrollY;
      const vh = window.innerHeight;

      // 히어로에는 자체 스크롤 버튼이 있으므로 fixed 버튼은 3D 구간에서만 띄운다.
      // 두 개가 동시에 보이면 모바일에서 화살표가 겹친다.
      const enteredThreeZone = y + vh * 0.5 >= docTop(threeSectionRef.current);
      const beforeNextSection = y + vh * 0.6 < docTop(nextSectionRef.current);

      setShowScrollToBottomBtn(enteredThreeZone && beforeNextSection);
      setShowScrollToTopBtn(y > vh * 0.5);
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threeSectionRef]);

  /**
   * 아래로 이동 핸들러. 히어로의 버튼과 3D 구간의 fixed 버튼이 함께 쓴다.
   * 히어로에 있으면 3D 섹션으로, 3D 섹션에 있으면 그 다음 섹션으로 보낸다.
   */
  const handleScrollToBottom = () => {
    const threeSection = threeSectionRef.current;
    const stillInHero = window.scrollY + window.innerHeight * 0.5 < docTop(threeSection);

    (stillInHero ? threeSection : nextSectionRef.current)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /** 위로 이동 버튼 클릭 핸들러 - 페이지 최상단으로 부드럽게 스크롤 */
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    showScrollToBottomBtn,
    showScrollToTopBtn,
    nextSectionRef,
    handleScrollToBottom,
    handleScrollToTop,
  };
}

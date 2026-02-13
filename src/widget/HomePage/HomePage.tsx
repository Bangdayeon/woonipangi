'use client';

import IconButton from '@/shared/ui/IconButton/IconButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import ThreeHead from './3DRender/three';
import { useClickImageEffect } from './ClickImageEffect/useClickImageEffect';

export default function HomePage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const { onPointerDown } = useClickImageEffect();

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

  const nextSectionRef = useRef<HTMLDivElement>(null);
  const justUnlockedRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const relockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isLockedRef = useRef(isLocked);
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // 스크롤 및 스크롤바 UI 제어
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

  // 실제 스크롤 발생 시 로직
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isAtTop = currentY <= 10;

      setShowScrollToBottomBtn(isAtTop);
      setShowScrollToTopBtn(!isAtTop);

      // 최상단이 아닐 때는 무조건 잠금을 해제함 (뒤로가기 등으로 중간 위치 진입 시 대응)
      if (!isAtTop && isLockedRef.current) {
        setIsLocked(false);
      }

      // 모바일 환경에서 '완전 최상단' 도달 시에만 다시 잠금
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="pb-80" onClick={onPointerDown}>
      {/* 아래로 이동 버튼 */}
      {showScrollToBottomBtn && (
        <IconButton
          onClick={handleScrollToBottom}
          size="lg"
          icon="IC_Arrow_Down"
          ariaLabel="아래로 스크롤"
          className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 animate-bounce shadow-2xl lg:hidden"
        />
      )}

      {/* 위로 이동 버튼 */}
      {showScrollToTopBtn && (
        <IconButton
          onClick={handleScrollToTop}
          variant="secondary"
          size="lg"
          icon="IC_Arrow_Up"
          ariaLabel="위로 스크롤"
          className="fixed right-5 bottom-10 z-50 shadow-2xl"
        />
      )}

      <motion.div style={{ y }}>
        <ThreeHead />
      </motion.div>

      <section
        ref={nextSectionRef}
        className="mt-50 flex flex-col items-center gap-30 px-20 text-center"
        aria-labelledby="intro-heading"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 id="intro-heading" className="text-4xl font-bold break-keep">
            광운대학교의 마스코트,
            <br className="md:hidden" /> 우니와 팡이를 소개합니다
          </h1>
        </motion.div>
      </section>
    </main>
  );
}

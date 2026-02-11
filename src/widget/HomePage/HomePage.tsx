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

  const [isLocked, setIsLocked] = useState(true);
  const [showScrollToBottomBtn, setShowScrollToBottomBtn] = useState(true);
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const justUnlockedRef = useRef(false); // 최상단 복귀 직후 잠금 방지 플래그

  // 스크롤 및 스크롤바 UI 제어 (Resize 포함)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const updateScrollState = () => {
      const isMobileOrTablet = window.innerWidth < 1024;
      const currentY = window.scrollY;

      /**
       * [수정] 버튼 가시성 제어
       * - 아래로 가기 버튼: 최상단(10px 이내)일 때만 표시
       * - 위로 가기 버튼: 최상단이 아닐 때 '항상' 표시
       */
      const isAtTop = currentY <= 10;
      setShowScrollToBottomBtn(isAtTop);
      setShowScrollToTopBtn(!isAtTop);

      // 데스크톱 모드일 때
      if (!isMobileOrTablet) {
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.touchAction = '';
        body.classList.remove('no-scrollbar');
        return;
      }

      // 모바일/태블릿 모드일 때 스크롤 잠금 적용
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

  // 실제 스크롤 발생 시 버튼 가시성 실시간 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isAtTop = currentY <= 10;

      // 어떤 환경에서든 최상단 여부에 따라 버튼 가시성 결정
      setShowScrollToBottomBtn(isAtTop);
      setShowScrollToTopBtn(!isAtTop);

      // 모바일 환경에서 최상단 도달 시 다시 잠금
      if (window.innerWidth < 1024 && currentY <= 0 && !isLocked && !justUnlockedRef.current) {
        setIsLocked(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked]);

  const handleScrollToBottom = () => {
    setIsLocked(false);
    justUnlockedRef.current = true;
    setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // smooth scroll이 시작된 뒤 re-lock guard 해제
      setTimeout(() => {
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
      {/* 아래로 이동 버튼: 최상단에서만 노출 (모바일 위주) */}
      {showScrollToBottomBtn && (
        <IconButton
          onClick={handleScrollToBottom}
          size="lg"
          icon="IC_Arrow_Down"
          ariaLabel="아래로 스크롤"
          className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 animate-bounce shadow-2xl lg:hidden"
        />
      )}

      {/* 위로 이동 버튼: 최상단이 아닐 때 '항상' 노출 */}
      {showScrollToTopBtn && (
        <IconButton
          onClick={handleScrollToTop}
          variant="secondary"
          size="lg"
          icon="IC_Arrow_Up"
          ariaLabel="위로 스크롤"
          className="fixed right-5 bottom-5 z-50 shadow-2xl"
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

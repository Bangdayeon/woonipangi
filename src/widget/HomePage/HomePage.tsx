'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useClickImageEffect } from './components/ClickImageEffect/useClickImageEffect';
import RandomText from './components/RandomText';
import ToNextSectionButton from './components/ToNextSectionButton';
import ToTopButton from './components/ToTopButton';
import ThreeHead from './components/three';
import { useHomePageScroll } from './hooks/useHomePageScroll';
import Section_1 from './sections/Section_1';
import Section_2 from './sections/Section_2';
import Section_3 from './sections/Section_3';

export default function HomePage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const { onPointerDown } = useClickImageEffect();

  const [isClient, setIsClient] = useState(false);

  // 스크롤 관련 상태 및 핸들러 훅
  const {
    showScrollToBottomBtn,
    showScrollToTopBtn,
    nextSectionRef,
    handleScrollToBottom,
    handleScrollToTop,
  } = useHomePageScroll();

  useEffect(() => {
    // eslint-disable-next-line
    setIsClient(true);
  }, []);

  // 서버 렌더링 시에는 플레이스홀더 반환
  if (!isClient) {
    return <div className="bg-gray50 h-screen w-full" />;
  }

  return (
    <main className="pb-80">
      <section onClick={onPointerDown}>
        <RandomText />

        {/* 아래로 이동 버튼 */}
        <ToNextSectionButton isShow={showScrollToBottomBtn} onClick={handleScrollToBottom} />

        {/* 위로 이동 버튼 */}
        <ToTopButton isShow={showScrollToTopBtn} onClick={handleScrollToTop} />

        <motion.div style={{ y }} className="z-9999">
          <ThreeHead />
        </motion.div>
      </section>
      {/* --- KEYBOARD SECTION --- */}
      <Section_1 ref={nextSectionRef} />

      {/* --- IDENTITY SECTION --- */}
      <Section_2 />

      <Section_3 />
    </main>
  );
}

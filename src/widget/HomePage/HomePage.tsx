'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

import { useClickImageEffect } from './components/ClickImageEffect/useClickImageEffect';
import RandomText from './components/RandomText';
import ToNextSectionButton from './components/ToNextSectionButton';
import ToTopButton from './components/ToTopButton';
import { useHomePageScroll } from './hooks/useHomePageScroll';
import Section_1 from './sections/Section_1';
import Section_2 from './sections/Section_2';
import Section_3 from './sections/Section_3';

const ThreeHead = dynamic(() => import('./components/three'), {
  ssr: false,
  loading: () => (
    <div
      className="bg-blue50 h-screen w-full bg-[linear-gradient(to_right,#CAEBFC_1.1px,transparent_1px),linear-gradient(to_bottom,#CAEBFC_1.1px,transparent_1px)] bg-size-[20px_20px]"
      aria-hidden
    />
  ),
});

export default function HomePage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const { onPointerDown } = useClickImageEffect();

  // 스크롤 관련 상태 및 핸들러 훅
  const {
    showScrollToBottomBtn,
    showScrollToTopBtn,
    nextSectionRef,
    handleScrollToBottom,
    handleScrollToTop,
  } = useHomePageScroll();

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

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { useClickImageEffect } from './components/ClickImageEffect/useClickImageEffect';
import RandomText from './components/RandomText';
import ToNextSectionButton from './components/ToNextSectionButton';
import ToTopButton from './components/ToTopButton';
import { useHomePageScroll } from './hooks/useHomePageScroll';
import HeroSection from './sections/HeroSection';
import Section_1 from './sections/Section_1';
import Section_2 from './sections/Section_2';
import Section_3 from './sections/Section_3';

const ThreeHead = dynamic(() => import('./components/three'), {
  ssr: false,
  loading: () => (
    <div
      className="bg-blue50 h-full w-full bg-[linear-gradient(to_right,#CAEBFC_1.1px,transparent_1px),linear-gradient(to_bottom,#CAEBFC_1.1px,transparent_1px)] bg-size-[20px_20px]"
      aria-hidden
    />
  ),
});

export default function HomePage() {
  const { onPointerDown } = useClickImageEffect();
  const threeSectionRef = useRef<HTMLElement>(null);

  // 스크롤 관련 상태 및 핸들러 훅
  const {
    showScrollToBottomBtn,
    showScrollToTopBtn,
    nextSectionRef,
    handleScrollToBottom,
    handleScrollToTop,
  } = useHomePageScroll(threeSectionRef);

  // 3D 섹션이 뷰포트를 지나가는 동안만 도는 패럴랙스.
  // 전역 scrollY 기준으로 두면 섹션이 보이기도 전에 값이 포화된다.
  const { scrollYProgress } = useScroll({
    target: threeSectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    // layout.tsx 가 이미 <main> 을 렌더하므로 여기서는 div 를 쓴다.
    <div className="pb-80">
      {/* --- HERO SECTION --- */}
      <HeroSection onScrollDown={handleScrollToBottom} />

      {/* --- 3D SECTION ---
          relative: RandomText 의 absolute 자식들이 문서가 아니라 이 섹션을 기준으로 잡히게 한다.
          overflow-hidden: 패럴랙스로 키운 캔버스가 이웃 섹션으로 새지 않게 한다.
          모바일에서 일부러 풀높이를 주지 않는다. 캔버스가 touch-action:none 이라
          화면을 꽉 채우면 스크롤을 시작할 자리가 없어진다. */}
      <section
        ref={threeSectionRef}
        onClick={onPointerDown}
        className="relative h-[75svh] w-full overflow-hidden lg:h-dvh"
      >
        <RandomText />

        <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] z-0 h-[120%]">
          <ThreeHead />
        </motion.div>
      </section>

      {/* --- KEYBOARD SECTION --- */}
      <Section_1 ref={nextSectionRef} />

      {/* --- IDENTITY SECTION --- */}
      <Section_2 />

      <Section_3 />

      {/* fixed 버튼은 섹션 밖 형제로 둔다. transform/overflow 를 가진 조상 안에 있으면
          fixed 가 그 조상 기준으로 컨테이닝되어 버린다. */}
      <ToNextSectionButton isShow={showScrollToBottomBtn} onClick={handleScrollToBottom} />
      <ToTopButton isShow={showScrollToTopBtn} onClick={handleScrollToTop} />
    </div>
  );
}

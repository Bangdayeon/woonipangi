'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

import ThreeHead from './components/three';
import { useClickImageEffect } from './components/ClickImageEffect/useClickImageEffect';
import RandomText from './components/RandomText';
import { useHomePageScroll } from './hooks/useHomePageScroll';
import ToNextSectionButton from './components/ToNextSectionButton';
import ToTopButton from './components/ToTopButton';
import Section_1 from './sections/Section_1';
import Section_2 from './sections/Section_2';

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
    return <div className="h-screen w-full bg-gray-50" />;
  }

  return (
    <main className="pb-80">
      <section onClick={onPointerDown}>

      <RandomText />
      
      {/* 아래로 이동 버튼 */}
      <ToNextSectionButton isShow={showScrollToBottomBtn} onClick={handleScrollToBottom}/>

      {/* 위로 이동 버튼 */}
      <ToTopButton isShow={showScrollToTopBtn} onClick={handleScrollToTop} />

      <motion.div style={{ y }} className="z-9999">
        <ThreeHead />
      </motion.div>

      </section>
      {/* --- KEYBOARD SECTION --- */}
      <div ref={nextSectionRef} className='h-60'/>
      <Section_1/>

      {/* --- IDENTITY SECTION --- */}
      <Section_2 />

      {/* --- RESOURCE SECTION --- */}
      {/* <section className="relative overflow-hidden bg-gray-50 px-6 py-40">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.4em] text-indigo-400 uppercase">
                Library
              </span>
              <h2 className="text-5xl leading-[0.85] font-black tracking-tighter uppercase md:text-7xl">
                Download <br /> Resources
              </h2>
            </div>
            <p className="max-w-50 text-right text-sm leading-snug font-medium text-gray-400">
              우니와 팡이를 <br />
              자유롭게 활용해보세요. <br />
              상업적 용도는 지양해주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: 'Graphic Pack', format: 'PNG / AI', count: '12 Files' },
              { title: 'Digital Goods', format: 'Wallpaper', count: '04 Files' },
              { title: 'Brand Guide', format: 'PDF', count: '01 File' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12 }}
                className="group flex aspect-4/5 cursor-pointer flex-col justify-between rounded-[2.5rem] border border-gray-100 bg-white p-12 shadow-sm transition-all hover:border-black hover:shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 transition-colors group-hover:bg-black group-hover:text-white">
                    <LinkIconButton
                      icon="IC_Download"
                      href="/files"
                      ariaLabel="다운로드"
                      className="h-6 w-6"
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase transition-colors group-hover:text-black">
                    {item.format}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-400">{item.count} 가용</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute top-0 right-0 z-0 h-full w-1/3 bg-indigo-50/30 blur-[100px]" />
      </section> */}

      {/* --- FOOTER --- */}
      {/* <footer className="flex flex-col items-center space-y-12 border-t border-gray-100 px-6 py-32 text-center">
        <div className="text-3xl font-black tracking-tighter uppercase italic underline decoration-indigo-500 decoration-4 underline-offset-4">
          Woonie & Pangi
        </div>
        <div className="space-y-4">
          <p className="text-xs leading-relaxed font-bold tracking-widest text-gray-400 uppercase">
            Designed for University Identity <br />© 2025 Archive Collection.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            {['Instagram', 'Terms', 'Privacy'].map(link => (
              <a
                key={link}
                href="#"
                className="text-[10px] font-black tracking-widest text-gray-300 uppercase transition-colors hover:text-black"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer> */}
    </main>
  );
}
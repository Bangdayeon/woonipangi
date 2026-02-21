'use client';

import Illust from '@/assets/images/illust.png';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Section_1() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full px-4 md:max-w-200 lg:max-w-300">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-72 w-full max-w-90 shrink-0 rounded-3xl md:h-96 md:max-w-96"
          >
            <Image
              src={Illust}
              alt="잔디밭에 있는 우니와 팡이 일러스트"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          {/* 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="font-label-xs text-gray400 tracking-widest">ORIGIN STORY</span>
            <h2 className="text-3xl font-black md:text-4xl">우니와 팡이의 시작</h2>
            <p className="font-body-lg text-gray500 max-w-md leading-relaxed">
              광운대 어딘가에 살고 있다는 소문이 있는 우니와 팡이. 우니는 오늘도 캠퍼스 잔디밭에서
              사과를 먹으며 구름을 보고 있고, 팡이는 그 옆에서 당근을 먹으며 할 일 목록을 정리하고
              있어요. 작은 날개로 어디든 날아다니는 두 캐릭터는 바쁜 광운인들 사이 어딘가에 항상
              있습니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <main className="pb-80">
      <motion.div style={{ y }}>
        <div className="relative aspect-1920/1080 w-full">
          <Image src="/Images/illust_01.png" alt="배경 이미지" fill priority sizes="100vw" />
        </div>
      </motion.div>
      <div className="mt-50 flex flex-col items-center gap-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold">광운대학교의 마스코트, 우니와 팡이를 소개합니다</h1>
        </motion.div>
        <section>
          <span className="text-2xl">
            2021년 5월 교내 공모전을 통해 탄생한 우니와 팡이는 <br />
            광운대학교의 상징색과 로고를 담아 디자인되었습니다.
          </span>
          <div className="mt-10 h-74 w-225 rounded-2xl bg-gray-50" />
        </section>
        <section>
          <span className="text-2xl">
            캠퍼스 곳곳에서 학생들과 함께하는 우니와 팡이는
            <br />
            친근하고 활기찬 학교의 모습을 대표하는 친구같은 존재입니다.
            <br />
            특별한 날과 평범한 날, 학교 곳곳에서 등장하는 우니와 팡이를 만나보세요
          </span>
          <div className="mt-10 h-74 w-225 rounded-2xl bg-gray-50" />
        </section>
        <section className="flex gap-10">
          <Link
            href="/intro"
            className="flex h-110 w-110 cursor-pointer items-center justify-center rounded-4xl shadow-xl transition-all hover:shadow-2xl"
          >
            <div className="relative aspect-350/466 w-66">
              <Image src="/Images/woonie_02.png" alt="우니" fill sizes="264px" />
            </div>
          </Link>
          <Link
            href="/intro"
            className="flex h-110 w-110 cursor-pointer items-center justify-center rounded-4xl shadow-xl transition-all hover:shadow-2xl"
          >
            <div className="relative aspect-350/466 w-66">
              <Image src="/Images/woonie_02.png" alt="우니" fill sizes="264px" />
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}

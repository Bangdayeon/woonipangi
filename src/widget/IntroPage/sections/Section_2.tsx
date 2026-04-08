'use client';

import PangImg from '@/assets/images/pang_fly.png';
import WoonieImg from '@/assets/images/woonie_default.png';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface CharacterCardProps {
  num: string;
  name: string;
  nameEn: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  reverse?: boolean;
}

function CharacterCard({
  num,
  name,
  nameEn,
  description,
  tags,
  image,
  reverse,
}: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`flex w-full flex-col items-center gap-10 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      {/* 텍스트 */}
      <div
        className={`flex flex-1 flex-col gap-5 ${reverse ? 'items-end text-right' : 'items-start text-left'}`}
      >
        <div className="flex flex-col gap-2">
          <span className="font-label-xs text-gray400 tracking-widest">MASCOT {num}</span>
          <h3 className="text-4xl font-black tracking-tight">
            {name}
            <span className="text-gray400 ml-3 text-xl font-medium">{nameEn}</span>
          </h3>
        </div>
        <p className="font-body-lg text-gray500 max-w-sm leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
        <div className={`flex flex-wrap gap-2 pt-2 ${reverse ? 'justify-end' : 'justify-start'}`}>
          {tags.map(tag => (
            <span
              key={tag}
              className="text-gray600 inline-flex rounded-full bg-white/60 px-3 py-1 text-[11px] font-semibold ring-1 ring-black/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 이미지 */}
      <div className="relative h-64 w-64 shrink-0 md:h-80 md:w-80">
        <div className="absolute inset-0 rounded-3xl bg-white/40 ring-1 ring-black/5" />
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-6 drop-shadow-md"
          unoptimized
        />
      </div>
    </motion.div>
  );
}

export default function Section_2() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="mx-auto w-full px-4 md:max-w-200 lg:max-w-300">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gray500 mb-6 inline-flex rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold tracking-widest ring-1 ring-black/5"
        >
          CHARACTERS
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20 text-4xl font-black tracking-tight md:text-5xl"
        >
          둘이서 하나,
          <br />
          <span className="text-gray400">광운의 마스코트</span>
        </motion.h2>

        <div className="flex flex-col gap-24">
          <CharacterCard
            num="01"
            name="우니"
            nameEn="WOONIE"
            description={`느긋하고 다정한 캠퍼스의 귀염둥이.\n일이 잘 안 풀려도 천천히 다시 해보는\n끈기 있는 성격이에요.\n먹는 거 좋아하고, 덤벙거리지만\n할 땐 확실하게 하는 타입.`}
            tags={['#먹보', '#긍정왕', '#할땐한다', '#사과좋아', '#가을감성']}
            image={WoonieImg}
          />
          <CharacterCard
            num="02"
            name="팡이"
            nameEn="PANG"
            description={`빠릿빠릿하고 에너지 넘치는 똘망이.\n우니가 실수하면 도와주고 생색내는 게\n특기예요. 당근을 유독 좋아하고\n어디서 꺼냈는지 모를 요술봉을 흔들면\n무슨 일이 벌어질지는 팡이도 몰라요.`}
            tags={['#ADHD감성', '#당근러버', '#요술봉보유', '#생색전문', '#초고속비행']}
            image={PangImg}
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
}

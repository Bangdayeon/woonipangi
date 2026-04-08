'use client';

import { pangsConch } from '@/data/pangsConch';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import LinkIconButton from '@/shared/ui/LinkIconButton/LinkIconButton';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import PangsConchResult from './PangsConchResult';

interface PangsConchProps {
  description: string;
}

export default function PangsConch({ description }: PangsConchProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dragX = useMotionValue(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDragEnd = () => {
    if (!question.trim() || loading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    dragX.set(0);
    timerRef.current = setTimeout(() => {
      const random = pangsConch[Math.floor(Math.random() * pangsConch.length)];
      setResult(random);
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="flex w-full grow flex-col md:max-w-200 lg:max-w-300">
        <header className="mb-5 flex items-center gap-4">
          <LinkIconButton
            variant="ghost"
            icon="IC_Arrow_Back"
            ariaLabel="뒤로 가기"
            href="/games"
          />
          <h1 className="text-2xl font-bold md:text-3xl">팡이의 소라고둥</h1>
        </header>
        <p className="mt-4 text-lg">{description}</p>

        {/* 질문 입력 */}
        <div className="my-4 flex w-full max-w-md items-center gap-2">
          <Input
            icon="IC_Chat"
            value={question}
            onChange={e => {
              if (timerRef.current) clearTimeout(timerRef.current);
              setQuestion(e.target.value);
              setResult(null);
              setLoading(false);
            }}
            placeholder="어떤 질문이든 물어보세요"
          />
          <Button
            onClick={handleDragEnd}
            disabled={!question.trim() || loading}
            label="답변 받기"
          />
        </div>

        {/* 이미지 컨테이너 */}
        <div className="relative w-full max-w-[200px] md:max-w-[320px]">
          {/* 줄 이미지 */}
          {question && (
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragX }}
              onDragEnd={handleDragEnd}
              className="absolute top-0 left-12 h-full w-full cursor-grab"
              role="button"
              tabIndex={0}
              aria-label="줄을 당겨서 답변 받기"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDragEnd();
                }
              }}
            >
              <Image
                src="/images/services/pang_conch_line.png"
                alt="Conch line"
                width={320}
                height={384} // 578 / 694 비율 적용
                style={{ objectFit: 'contain', pointerEvents: 'none' }}
                sizes="(max-width: 768px) 200px, 320px"
                draggable={false}
                unoptimized
              />
            </motion.div>
          )}

          {/* 소라 이미지 */}
          <div className="relative w-full">
            <Image
              src="/images/services/pang_conch.png"
              alt="Conch"
              width={320}
              height={384}
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 200px, 320px"
              draggable={false}
              unoptimized
            />
          </div>
        </div>

        {/* 로딩 */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-lg font-semibold"
              role="status"
              aria-live="polite"
            >
              답변 생성 중
            </motion.div>
          )}
        </AnimatePresence>

        {/* 질문 + 결과 */}
        <AnimatePresence>
          {!loading && result && question && (
            <motion.div
              key={result}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center"
            >
              <PangsConchResult question={question} result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 출처 표시 */}
      <div className="mt-auto mb-2 text-xs text-gray-500 opacity-70">
        원본: 네모바지 스폰지밥 시즌 3 에피소드 42회 &apos;마법의 소라고동(Club SpongeBob)&apos;
      </div>
    </main>
  );
}
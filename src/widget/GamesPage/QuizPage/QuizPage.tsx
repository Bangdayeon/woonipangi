'use client';

import Button from '@/shared/ui/Button/Button';
import LinkIconButton from '@/shared/ui/LinkIconButton/LinkIconButton';
import { Quiz } from '@/types/quiz.types';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import QuizIntro from './components/QuizIntro';
import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import { useQuizEngine } from './hooks/useQuizEngine';

const SLIDE_DISTANCE = 24;

interface Props {
  quiz: Quiz;
}

export default function QuizPage({ quiz }: Props) {
  const {
    phase,
    index,
    direction,
    total,
    question,
    selectedId,
    percent,
    isSubmitting,
    start,
    select,
    back,
  } = useQuizEngine(quiz);
  const reduceMotion = useReducedMotion();

  const variants = {
    enter: (dir: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir * SLIDE_DISTANCE },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir * -SLIDE_DISTANCE },
  };

  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="flex w-full grow flex-col md:max-w-200 lg:max-w-300">
        <header className="mb-5 flex items-center gap-4">
          <LinkIconButton
            variant="ghost"
            icon="IC_Arrow_Back"
            ariaLabel="심심풀이 목록으로 이동"
            href="/games"
          />
          <h1 className="text-2xl font-bold md:text-3xl">{quiz.title}</h1>
        </header>

        {phase === 'question' && <QuizProgress index={index} total={total} percent={percent} />}

        {/* 문항 길이 차이로 레이아웃이 튀지 않도록 최소 높이를 잡아둔다. */}
        <div className="min-h-[26rem] md:min-h-[22rem]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.section
              key={phase === 'intro' ? 'intro' : question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {phase === 'intro' ? (
                <QuizIntro quiz={quiz} onStart={start} />
              ) : (
                <QuizQuestion
                  question={question}
                  selectedId={selectedId}
                  disabled={isSubmitting}
                  onSelect={select}
                />
              )}
            </motion.section>
          </AnimatePresence>
        </div>

        {phase === 'question' && (
          <div className="mt-6 mb-20">
            <Button
              variant="tertiary"
              size="sm"
              label="이전 질문"
              onClick={back}
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>
    </main>
  );
}

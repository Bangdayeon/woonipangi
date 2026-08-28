'use client';

import { KW_MEAL_URL } from '@/shared/lib/kwMeal';
import LinkButton from '@/shared/ui/LinkButton/LinkButton';
import { Skeleton } from '@/shared/ui/Skeleton';
import type { MealCorner } from '@/types/meal.types';

import { type TodayMealState, useTodayMeal } from '../hooks/useTodayMeal';

/** 메뉴 대신 휴무/방학 안내가 들어온 셀을 알아보기 위한 키워드 */
const CLOSURE_KEYWORDS = /방학|급식\s*종료|미운영|휴무|운영\s*안/;

const isClosureNotice = (menu: string[]) =>
  menu.length <= 2 && menu.some(l => CLOSURE_KEYWORDS.test(l));

/** '2026-06-15' -> '6월 15일' */
const toKoreanDate = (iso: string) => {
  const [, month, day] = iso.split('-');
  return `${Number(month)}월 ${Number(day)}일`;
};

function CornerRow({ corner }: { corner: MealCorner }) {
  const closed = isClosureNotice(corner.menu);

  return (
    <article className="bg-blue50 rounded-2xl px-4 py-3">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-label-md text-gray800">{corner.label}</h3>
        <span className="font-label-xs text-gray500 shrink-0">
          {corner.price} · {corner.time}
        </span>
      </div>
      <p
        className={
          corner.menu.length === 0 || closed
            ? 'font-body-sm text-gray500 mt-1'
            : 'font-body-sm text-gray700 mt-1 line-clamp-2'
        }
      >
        {corner.menu.length === 0 ? '메뉴 미등록' : corner.menu.join(' · ')}
      </p>
    </article>
  );
}

function Notice({ title, description }: { title: string; description?: string }) {
  return (
    <div className="bg-blue50 rounded-2xl px-4 py-6 text-center">
      <p className="font-body-md text-gray700">{title}</p>
      {description && <p className="font-body-sm text-gray500 mt-1">{description}</p>}
    </div>
  );
}

function MealBody({ state }: { state: TodayMealState }) {
  switch (state.status) {
    case 'loading':
      return (
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map(i => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      );

    case 'error':
      return (
        <Notice
          title="지금은 식단 정보를 불러올 수 없어요"
          description="학교 홈페이지에서 직접 확인해 주세요"
        />
      );

    case 'weekend':
      return <Notice title="오늘은 주말이라 학식 운영이 없어요" />;

    case 'unavailable':
      return (
        <Notice
          title={`오늘(${toKoreanDate(state.todayIso)})은 등록된 식단이 없어요`}
          description={`게시된 식단: ${state.week.from} ~ ${state.week.to}`}
        />
      );

    case 'ok':
      return (
        <div className="flex flex-col gap-2">
          {state.today.corners.map(corner => (
            <CornerRow key={corner.title} corner={corner} />
          ))}
        </div>
      );
  }
}

export default function TodayMealCard() {
  const state = useTodayMeal();

  return (
    <section
      aria-labelledby="today-meal-heading"
      aria-live="polite"
      className="border-blue100 w-full rounded-3xl border bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="today-meal-heading" className="font-title-md text-gray900">
          오늘의 교내식당 메뉴
        </h2>
        {/* 원본으로 가는 길은 fetch 결과와 무관하게 항상 열려 있어야 한다. */}
        <LinkButton
          href={KW_MEAL_URL}
          label="이번주 메뉴"
          icon="IC_Arrow_Next"
          iconPosition="right"
          size="sm"
          radius="full"
          variant="tertiary"
          className="shrink-0"
        />
      </div>

      <div className="mt-4">
        <MealBody state={state} />
      </div>
    </section>
  );
}

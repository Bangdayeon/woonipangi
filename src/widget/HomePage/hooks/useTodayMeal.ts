'use client';

import type { MealDay, MealWeek } from '@/types/meal.types';
import { useQuery } from '@tanstack/react-query';

/**
 * KST 기준 오늘. 서버 타임존과 무관하게 항상 서울 날짜를 준다.
 * 학교가 게시하는 날짜가 KST 이므로 비교 기준도 KST 여야 한다.
 */
export function getSeoulToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find(part => part.type === type)?.value ?? '';

  return { iso: `${get('year')}-${get('month')}-${get('day')}`, weekday: get('weekday') };
}

/**
 * 카드가 중첩 삼항 없이 switch 하나로 끝나도록 판별 유니온으로 돌려준다.
 * 방학이면 오늘 날짜가 게시된 주에 아예 없으므로 unavailable 이 상시 케이스다.
 */
export type TodayMealState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'weekend'; todayIso: string }
  | { status: 'unavailable'; todayIso: string; week: MealWeek }
  | { status: 'ok'; todayIso: string; week: MealWeek; today: MealDay };

/** 개발 중에는 ?debugDate=2026-06-15 로 특정 날짜 상태를 강제할 수 있다. */
function getDebugDate() {
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('debugDate');
}

export function useTodayMeal(): TodayMealState {
  const { data, isPending, isError } = useQuery({
    queryKey: ['meal', 'week'],
    queryFn: async ({ signal }): Promise<MealWeek> => {
      const response = await fetch('/api/meal', { signal });
      if (!response.ok) throw new Error(`meal api ${response.status}`);
      return response.json();
    },
    // 옵션은 전역 QueryClient 가 아니라 호출부에서 정한다.
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // SSR 에서는 항상 여기서 끝나므로 서버 HTML 에 날짜가 박히지 않는다(하이드레이션 안전).
  if (isPending) return { status: 'loading' };
  if (isError || !data) return { status: 'error' };

  const debugDate = getDebugDate();
  // 디버그 날짜도 같은 KST 포맷터를 태워야 요일이 어긋나지 않는다(정오 기준).
  const seoul = debugDate
    ? getSeoulToday(new Date(`${debugDate}T12:00:00+09:00`))
    : getSeoulToday();
  const todayIso = debugDate ?? seoul.iso;
  const isWeekend = seoul.weekday === 'Sat' || seoul.weekday === 'Sun';

  // 주말을 먼저 판정해야 문구가 구체적이 된다.
  if (isWeekend) return { status: 'weekend', todayIso };

  const today = data.days.find(day => day.date === todayIso);
  if (!today) return { status: 'unavailable', todayIso, week: data };

  return { status: 'ok', todayIso, week: data, today };
}

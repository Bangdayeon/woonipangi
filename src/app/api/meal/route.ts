import { fetchWeeklyMeal } from '@/shared/lib/kwMeal';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Next 는 이 값을 빌드 타임에 정적으로 읽어야 해서 import 한 상수를 쓸 수 없다.
// kwMeal.ts 의 MEAL_REVALIDATE_SECONDS 와 같은 값으로 맞춰둘 것.
export const revalidate = 3600;

/**
 * 학교 식단안내 페이지를 서버에서 받아 파싱해 내려준다.
 * 학교 페이지에 CORS 헤더가 없어 브라우저에서 직접 부를 수 없다.
 */
export async function GET() {
  try {
    const week = await fetchWeeklyMeal();

    return NextResponse.json(week, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('Meal fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to load meal' },
      // 학교 서버 장애 시 CDN 이 60초간 에러를 흡수해 재요청 폭주를 막는다.
      { status: 502, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }
}

import { MEAL_REVALIDATE_SECONDS, fetchWeeklyMeal } from '@/shared/lib/kwMeal';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = MEAL_REVALIDATE_SECONDS;

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

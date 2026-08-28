import IconButton from '@/shared/ui/IconButton/IconButton';
import Link from 'next/link';

import TodayMealCard from '../components/TodayMealCard';

/** 바로가기 카드. 내용은 각 카드 안에서 직접 채운다. */
const SHORTCUTS = [
  { href: '/files', label: '마스코트 모음' },
  { href: '/games', label: '심심풀이' },
  { href: '/games/bab', label: '오늘 뭐 먹지' },
] as const;

interface Props {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: Props) {
  return (
    // grid-rows-[1fr_auto]: 본문은 남는 공간에서 가운데 정렬, 스크롤 버튼은 항상 맨 아래.
    // 화면이 짧아도 둘이 겹치지 않는다. pt 는 fixed 헤더(h-15 md:h-20)를 비켜가기 위한 것.
    <section className="relative grid min-h-dvh w-full grid-rows-[1fr_auto] gap-6 px-5 pt-24 pb-10 md:pt-32 md:pb-14">
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-140 flex-col items-center gap-8 md:max-w-160 md:gap-12">
          <header className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-black tracking-tighter md:text-5xl">우니팡이</h1>
            <p className="font-body-md text-gray600">광운대학교 마스코트 우니와 팡이</p>
          </header>

          <nav aria-label="바로가기" className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {SHORTCUTS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="border-blue100 hover:border-blue200 flex min-h-32 flex-col rounded-3xl border bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-colors md:min-h-40 md:p-6"
              >
                {/* 내용은 여기에 채운다 */}
              </Link>
            ))}
          </nav>

          <TodayMealCard />
        </div>
      </div>

      <div className="flex justify-center">
        {/* 기본 크기는 size="lg"(h-10)에서 오고, md/lg 에서만 키운다.
            같은 브레이크포인트에서 크기 클래스가 충돌하면 tailwind-merge 가 없어 순서에 따라 갈린다. */}
        <IconButton
          onClick={onScrollDown}
          size="lg"
          variant="primary"
          icon="IC_Arrow_Down"
          ariaLabel="아래로 스크롤"
          className="animate-bounce shadow-lg md:h-14 md:w-14 lg:h-16 lg:w-16"
        />
      </div>
    </section>
  );
}

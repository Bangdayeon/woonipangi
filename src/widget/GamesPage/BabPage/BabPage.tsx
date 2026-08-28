'use client';

import { Restaurant } from '@/data/restaurants';
import Button from '@/shared/ui/Button/Button';
import LinkIconButton from '@/shared/ui/LinkIconButton/LinkIconButton';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useEffect, useRef, useState } from 'react';

import FilterPanel from './components/FilterPanel';
import PickResult from './components/PickResult';
import RestaurantList from './components/RestaurantList';
import { ROLL_DURATION_MS, ROLL_TICK_MS } from './constants/filterOptions';
import { useBabPick } from './hooks/useBabPick';

export default function BabPage() {
  const {
    isHydrated,
    selectedCategories,
    selectedLocations,
    selectedCount,
    candidates,
    picked,
    setPicked,
    reroll,
    toggleCategory,
    toggleLocation,
    resetCategories,
    resetLocations,
    resetFilters,
  } = useBabPick();

  // 뽑는 동안 후보 이름을 빠르게 갈아끼워 '돌아가는' 느낌을 준다.
  const [rollingName, setRollingName] = useState<string | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopRolling = () => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (stopRef.current) clearTimeout(stopRef.current);
    tickRef.current = null;
    stopRef.current = null;
  };

  useEffect(() => stopRolling, []);

  const handleReroll = () => {
    if (tickRef.current || candidates.length < 2) return;

    tickRef.current = setInterval(() => {
      setRollingName(candidates[Math.floor(Math.random() * candidates.length)].name);
    }, ROLL_TICK_MS);

    stopRef.current = setTimeout(() => {
      stopRolling();
      setRollingName(null);
      reroll();
    }, ROLL_DURATION_MS);
  };

  // 목록에서 고른 집은 애니메이션 없이 바로 결과로 올린다.
  const handleSelectFromList = (restaurant: Restaurant) => {
    stopRolling();
    setRollingName(null);
    setPicked(restaurant);
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
          <h1 className="text-2xl font-bold md:text-3xl">오늘 뭐 먹지</h1>
        </header>

        <FilterPanel
          selectedCategories={selectedCategories}
          selectedLocations={selectedLocations}
          selectedCount={selectedCount}
          onToggleCategory={toggleCategory}
          onToggleLocation={toggleLocation}
          onResetCategories={resetCategories}
          onResetLocations={resetLocations}
          onReset={resetFilters}
        />

        {!isHydrated ? (
          // 첫 뽑기는 하이드레이션 뒤에 일어난다. 그때까지 결과 자리를 비워두면
          // 프리렌더된 HTML 에 '밥집이 없어요' 가 잠깐 스쳐 보인다.
          <div className="mt-8 flex flex-col items-center" aria-hidden="true">
            <Skeleton className="h-30 w-30 rounded-2xl" />
            <Skeleton className="mt-4 h-6 w-32 rounded-md" />
            <Skeleton className="mt-3 h-5 w-48 rounded-md" />
          </div>
        ) : picked ? (
          <>
            <div className="mt-8">
              <PickResult restaurant={picked} rollingName={rollingName} />
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                label={rollingName !== null ? '뽑는 중...' : '다시 뽑기'}
                onClick={handleReroll}
                disabled={candidates.length < 2 || rollingName !== null}
              />
            </div>
          </>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="font-body-md text-gray600">조건에 맞는 밥집이 없어요.</p>
            <Button variant="primary" icon="IC_Reset" label="필터 초기화" onClick={resetFilters} />
          </div>
        )}

        <RestaurantList candidates={candidates} onSelect={handleSelectFromList} />

        <div className="h-20" />
      </div>
    </main>
  );
}

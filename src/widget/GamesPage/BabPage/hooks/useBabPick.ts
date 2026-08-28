'use client';

import { Category, Location, Restaurant, restaurants } from '@/data/restaurants';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

const pickRandom = <T>(pool: readonly T[]): T | null =>
  pool.length === 0 ? null : pool[Math.floor(Math.random() * pool.length)];

const toggle = <T>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter(item => item !== value) : [...list, value];

const subscribeToNothing = () => () => {};

/**
 * 서버에서는 false, 하이드레이션이 끝난 뒤에는 true.
 * 첫 뽑기를 클라이언트로 미루기 위한 것이다. 서버 렌더에서 Math.random()을 부르면
 * 프리렌더된 HTML에 특정 밥집이 구워져 모두가 같은 결과를 보게 되고, 하이드레이션도 깨진다.
 */
const useIsHydrated = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );

/**
 * '오늘 뭐 먹지'의 상태 전부.
 *
 * 필터는 차원 안에서는 OR, 차원 사이에서는 AND 로 겹친다.
 * 아무것도 안 고르면 그 차원은 통과 — 즉 미선택 = 전체.
 */
export function useBabPick() {
  const isHydrated = useIsHydrated();

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [picked, setPicked] = useState<Restaurant | null>(null);
  const [pickedFor, setPickedFor] = useState<Restaurant[] | null>(null);

  // 아래 렌더 단계 조정이 candidates 의 identity 로 '후보가 바뀌었나'를 판단하므로
  // 이 useMemo 는 최적화가 아니라 정확성을 위한 것이다. 없으면 매 렌더 새 배열이라 무한 렌더가 된다.
  const candidates = useMemo(
    () =>
      restaurants.filter(
        restaurant =>
          (selectedCategories.length === 0 ||
            restaurant.categories.some(category => selectedCategories.includes(category))) &&
          (selectedLocations.length === 0 || selectedLocations.includes(restaurant.location))
      ),
    [selectedCategories, selectedLocations]
  );

  // 후보가 바뀌었을 때만 손본다: 첫 진입(pickedFor === null)에는 하나 뽑고,
  // 필터 때문에 지금 결과가 후보에서 빠졌으면 다시 뽑는다. 그대로 살아있으면 유지한다.
  // 렌더 중 상태 조정은 React가 권장하는 방식이라 effect 없이 처리한다.
  if (isHydrated && pickedFor !== candidates) {
    setPickedFor(candidates);
    if (!picked || !candidates.some(restaurant => restaurant.id === picked.id)) {
      setPicked(pickRandom(candidates));
    }
  }

  /** 다시 뽑기. 후보가 둘 이상이면 직전 결과는 후보에서 뺀다. */
  const reroll = useCallback(() => {
    setPicked(previous => {
      const pool =
        previous && candidates.length > 1
          ? candidates.filter(restaurant => restaurant.id !== previous.id)
          : candidates;
      return pickRandom(pool) ?? previous;
    });
  }, [candidates]);

  const toggleCategory = useCallback((category: Category) => {
    setSelectedCategories(previous => toggle(previous, category));
  }, []);

  const toggleLocation = useCallback((location: Location) => {
    setSelectedLocations(previous => toggle(previous, location));
  }, []);

  const resetCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const resetLocations = useCallback(() => {
    setSelectedLocations([]);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedLocations([]);
  }, []);

  return {
    isHydrated,
    selectedCategories,
    selectedLocations,
    selectedCount: selectedCategories.length + selectedLocations.length,
    candidates,
    picked,
    setPicked,
    reroll,
    toggleCategory,
    toggleLocation,
    resetCategories,
    resetLocations,
    resetFilters,
  };
}

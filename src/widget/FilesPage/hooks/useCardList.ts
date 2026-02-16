import { Card } from '@/types/card.types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  FilterState,
  isValidCharacter,
  isValidDepartment,
  isValidEvent,
  isValidIllust,
} from '../constants/filterOptions';
import { SortCriterion, SortOrder } from '../constants/sortOptions';
import { isValidSortCriterion, isValidSortOrder } from '../constants/sortOptions';
import { useCardFilter } from './useCardFilter';
import { useCardSearch } from './useCardSearch';
import { useCardSort } from './useCardSort';

export function useCardList(allCards: Card[]) {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('q') || '';

  // 정렬 파라미터
  const rawCriterion = searchParams.get('sortBy') || 'default';
  const sortCriterion: SortCriterion = isValidSortCriterion(rawCriterion)
    ? rawCriterion
    : 'default';

  const rawOrder = searchParams.get('order') || 'asc';
  const sortOrder: SortOrder = isValidSortOrder(rawOrder) ? rawOrder : 'asc';

  // 필터 파라미터
  const rawCharacter = searchParams.get('character');
  const rawDepartment = searchParams.get('department');
  const rawEvent = searchParams.get('event');
  const rawIllust = searchParams.get('illust');

  const filters: FilterState = useMemo(
    () => ({
      character: rawCharacter && isValidCharacter(rawCharacter) ? rawCharacter : undefined,
      department: rawDepartment && isValidDepartment(rawDepartment) ? rawDepartment : undefined,
      event: rawEvent && isValidEvent(rawEvent) ? rawEvent : undefined,
      illust: rawIllust && isValidIllust(rawIllust) ? rawIllust : undefined,
    }),
    [rawCharacter, rawDepartment, rawEvent, rawIllust]
  );

  // 1단계: 검색
  const searchedCards = useCardSearch(allCards, searchTerm);

  // 2단계: 필터링
  const filteredCards = useCardFilter(searchedCards, filters);

  // 3단계: 정렬
  const sortedCards = useCardSort(filteredCards, sortCriterion, sortOrder);

  return {
    cards: sortedCards,
    searchTerm,
    sortCriterion,
    sortOrder,
    filters,
  };
}

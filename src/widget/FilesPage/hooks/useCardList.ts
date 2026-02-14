import { Card } from '@/types/card.types';
import { useSearchParams } from 'next/navigation';

import {
  SortCriterion,
  SortOrder,
  isValidSortCriterion,
  isValidSortOrder,
} from '../constants/sortOptions';
import { useCardFilter } from './useCardFilter';
import { useCardSearch } from './useCardSearch';
import { useCardSort } from './useCardSort';

export function useCardList(allCards: Card[]) {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('q') || '';
  const rawCriterion = searchParams.get('sortBy') || 'default';
  const sortCriterion: SortCriterion = isValidSortCriterion(rawCriterion)
    ? rawCriterion
    : 'default';

  const rawOrder = searchParams.get('order') || 'asc';
  const sortOrder: SortOrder = isValidSortOrder(rawOrder) ? rawOrder : 'asc';
  // 추후 확장: const category = searchParams.get('category');

  // 1단계: 검색
  const searchedCards = useCardSearch(allCards, searchTerm);

  // 2단계: 필터링 (추후 확장)
  const filteredCards = useCardFilter(searchedCards, {});

  // 3단계: 정렬
  const sortedCards = useCardSort(filteredCards, sortCriterion, sortOrder);

  return {
    cards: sortedCards,
    searchTerm,
    sortCriterion,
    sortOrder,
  };
}

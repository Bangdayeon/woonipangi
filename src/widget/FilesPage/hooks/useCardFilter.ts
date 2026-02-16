import { Card } from '@/types/card.types';
import { useMemo } from 'react';

import {
  CHARACTER,
  DEPARTMENT,
  EVENT,
  FilterOption,
  FilterState,
  ILLUST,
} from '../constants/filterOptions';

function applyTagFilter(
  cards: Card[],
  filterValue: string | undefined,
  options: FilterOption
): Card[] {
  if (!filterValue || filterValue === 'all') return cards;
  const label = options.find(o => o.value === filterValue)?.label;
  return label ? cards.filter(card => card.tags.includes(label)) : cards;
}

export function useCardFilter(cards: Card[], filters: FilterState) {
  const filteredCards = useMemo(() => {
    let result = cards;
    result = applyTagFilter(result, filters.character, CHARACTER);
    result = applyTagFilter(result, filters.department, DEPARTMENT);
    result = applyTagFilter(result, filters.event, EVENT);
    result = applyTagFilter(result, filters.illust, ILLUST);
    return result;
  }, [cards, filters]);

  return filteredCards;
}

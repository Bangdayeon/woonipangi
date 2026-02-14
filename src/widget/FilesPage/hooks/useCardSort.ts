import { Card } from '@/types/card.types';
import { useMemo } from 'react';

import { SortCriterion, SortOrder } from '../constants/sortOptions';

export function useCardSort(cards: Card[], criterion: SortCriterion, order: SortOrder) {
  const sortedCards = useMemo(() => {
    const result = [...cards];

    switch (criterion) {
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    // 역순 정렬
    return order === 'desc' ? result.reverse() : result;
  }, [cards, criterion, order]);

  return sortedCards;
}

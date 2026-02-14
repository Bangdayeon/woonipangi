import { Card } from '@/types/card.types';
import { useMemo } from 'react';

import { FilterState } from '../constants/filterOptions';

export function useCardFilter(cards: Card[], filters: FilterState) {
  const filteredCards = useMemo(() => {
    const result = [...cards];

    // 추후 필터 조건 추가
    // if (filters.category) {
    //   result = result.filter(card => card.category === filters.category);
    // }

    return result;
  }, [cards]); // TODO: filters 추가

  return filteredCards;
}

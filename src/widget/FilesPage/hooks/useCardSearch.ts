import { Card } from '@/types/card.types';
import { useMemo } from 'react';

export function useCardSearch(cards: Card[], searchTerm: string) {
  const searchedCards = useMemo(() => {
    // 카드 목록, 검색어가 바뀔 때만 필터링 로직 실행
    if (!searchTerm.trim()) return cards; // 검색어가 공백인 경우는 연산 x

    const lowerCaseSearch = searchTerm.toLowerCase(); // 대소문자 구분 해제

    return cards.filter(card => {
      const isTitleMatch = card.title.toLowerCase().includes(lowerCaseSearch); // title에 검색어가 포함되는가
      const isTagMatch = card.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)); // tag에 검색어가 포함되는가
      return isTitleMatch || isTagMatch;
    });
  }, [cards, searchTerm]);

  return searchedCards;
}

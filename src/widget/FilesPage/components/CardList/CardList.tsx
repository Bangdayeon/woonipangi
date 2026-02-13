import { Card as CardProps } from '@/types/card.types';

import Card from '../Card/Card';

export interface CardListProps {
  cards: CardProps[];
}

export default function CardList({ cards }: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray400">표시할 항목이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          tags={card.tags}
          tmi={card.tmi}
          fileUrls={card.fileUrls}
          thumbnail={card.thumbnail}
          createdAt={card.createdAt}
        />
      ))}
    </div>
  );
}

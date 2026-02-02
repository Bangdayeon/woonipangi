import Card, { CardProps } from '../Card/Card';

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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, index) => (
        <Card
          key={`${card.title}-${index}`} // 실제 서비스에선 id 권장
          image={card.image}
          tags={card.tags}
          title={card.title}
          uploadDate={card.uploadDate}
        />
      ))}
    </div>
  );
}

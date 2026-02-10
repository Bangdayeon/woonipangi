import { Card as CardType } from '@/types/card.types';
import Image from 'next/image';

import IconButton from '../IconButton/IconButton';
import Tag from './Tag/Tag';

export default function Card({ id, title, tags, fileUrls, thumbnail, createdAt }: CardType) {
  const date = new Date(createdAt);
  const isValidDate = !isNaN(date.getTime());

  const formattedDate = isValidDate ? date.toLocaleDateString('ko-KR') : '';
  const isoDate = isValidDate ? date.toISOString() : '';

  return (
    <div className="border-gray100 flex w-full flex-col rounded-2xl border">
      <div className="border-gray100 aspect-18/20 w-full border-b">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-[90%] w-[90%]">
            <Image src={thumbnail} alt={title} fill className="object-contain" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 px-3.5 py-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-title-sm line-clamp-1 md:text-[20px]">{title}</span>
            <div className="flex shrink-0">
              <IconButton icon="IC_Download" variant="ghost" ariaLabel="파일 다운" />
            </div>
          </div>
          <div className="hidden gap-1 md:flex">
            {tags.map((tag, index) => (
              <Tag key={`${tag}-${index}`} text={tag} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body-sm text-gray400">
            등록일 | <time dateTime={isoDate}>{formattedDate}</time>
          </span>
        </div>
      </div>
    </div>
  );
}

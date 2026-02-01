import Image from 'next/image';

import IconButton from '../IconButton/IconButton';
import Tag from './Tag/Tag';

export interface CardProps {
  image: string;
  tags: string[];
  title: string;
  uploadDate: Date;
}

export default function Card({ image, tags, title, uploadDate }: CardProps) {
  const formattedDate = uploadDate.toLocaleDateString('ko-KR');
  const isoDate = uploadDate.toISOString();

  return (
    <div className="border-gray100 flex h-50 w-38 flex-col rounded-2xl border md:h-76 md:w-52">
      <div className="border-gray100 flex h-40 w-38 items-center justify-center border-b md:h-50 md:w-52">
        <div className="relative h-30 w-25 md:h-46 md:w-48">
          <Image src={image} alt="" fill className="object-contain" />
        </div>
      </div>
      <div className="flex h-25 flex-col justify-between px-3.5 py-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-title-sm md:text-[20px]">{title}</span>
            <div className="flex">
              <IconButton icon="IC_Download" variant="ghost" ariaLabel="파일 다운" />
              {/* <IconButton icon="IC_Bookmark" variant="ghost" ariaLabel="북마크" /> TODO: 추후 구현*/}
            </div>
          </div>
          <div className="hidden gap-1 md:flex">
            {tags.map((tag, index) => (
              <Tag key={`${tag}-${index}`} text={tag} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* <LikeButton /> TODO: 추후 구현*/}
          <span className="font-body-sm text-gray400">
            등록일 | <time dateTime={isoDate}>{formattedDate}</time>
          </span>
        </div>
      </div>
    </div>
  );
}

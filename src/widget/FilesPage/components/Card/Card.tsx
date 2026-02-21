import IconButton from '@/shared/ui/IconButton/IconButton';
import Popover from '@/shared/ui/Popover/Popover';
import { download } from '@/shared/utils/download';
import { formatDate } from '@/shared/utils/formatDate';
import { Card as CardType } from '@/types/card.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Tag from './Tag/Tag';

export default function Card({
  id,
  title,
  tags,
  fileUrls,
  thumbnail,
  createdAt,
  index,
}: CardType & { index: number }) {
  const router = useRouter();
  const { formattedDate, isoDate } = formatDate(createdAt);

  const handleCardClick = () => {
    router.push(`/files/${id}`);
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`${title} 상세보기`}
      className="border-gray100 active:border-gray300 hover:border-gray200 hover:ring-gray200 flex w-full cursor-pointer flex-col rounded-2xl border transition-colors duration-150 hover:ring-1"
      onClick={handleCardClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="border-gray100 aspect-18/20 w-full border-b">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-[90%] w-[90%]">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 23vw, 15vw"
              className="object-contain"
              priority={index === 0}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 px-2 py-2 md:px-3 lg:px-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-title-sm line-clamp-1 md:text-[16px]">{title}</span>
        </div>
        <div className="hidden gap-1 md:flex">
          {tags.map((tag, tagIndex) => (
            <Tag key={`${tag}-${tagIndex}`} text={tag} />
          ))}
        </div>
        <div className="flex items-end justify-between">
          <span className="text-gray600 font-label-xs">
            제작일 | <time dateTime={isoDate}>{formattedDate}</time>
          </span>
          <Popover placement="top-end">
            <Popover.Trigger popoverKey="menu">
              <IconButton
                icon="IC_Download"
                variant="ghost"
                ariaLabel="파일 다운"
                aria-haspopup="menu"
                aria-controls={`download-menu-${id}`} // 어떤 메뉴인지 연결
              />
            </Popover.Trigger>
            <Popover.Content popoverKey="menu">
              {close => (
                <div role="menu" id={`download-menu-${id}`} aria-label="다운로드 옵션">
                  {fileUrls.map((url, index) => {
                    const extensionMatch = url.match(/\.(\w+)(\?|$)/);
                    const extension = extensionMatch ? extensionMatch[1].toUpperCase() : 'FILE';

                    return (
                      <button
                        key={`${id}-file-${index}`}
                        role="menuitem"
                        onClick={() => {
                          download(url, title, extension);
                          close();
                        }}
                        className="text-gray700 hover:bg-gray50 block w-full px-4 py-2 text-left text-sm transition-colors duration-150"
                      >
                        {extension} 다운로드
                      </button>
                    );
                  })}
                </div>
              )}
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </article>
  );
}

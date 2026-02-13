import { useModalStore } from '@/stores/modalStore';
import { Card as CardType } from '@/types/card.types';
import Image from 'next/image';

import IconButton from '../IconButton/IconButton';
import Popover from '../Popover/Popover';
import Tag from './Tag/Tag';

export default function Card({ id, title, tags, fileUrls, thumbnail, createdAt }: CardType) {
  const date = new Date(createdAt);
  const isValidDate = !isNaN(date.getTime());

  const formattedDate = isValidDate
    ? date.toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
    : '';
  const isoDate = isValidDate ? date.toISOString() : '';

  const { open } = useModalStore();

  const handleCardClick = () => {
    open('CARDMORE', { id, title, thumbnail });
  };

  const handleDownload = (url: string, extension: string) => {
    const filename = `${title}.${extension.toLowerCase()}`;
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

    const link = document.createElement('a');
    link.href = downloadUrl;

    // 다운로드 속성 명시
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();

    // 가비지 컬렉션 유도
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <div
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
            <Image src={thumbnail} alt={title} fill className="object-contain" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 px-3.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-title-sm line-clamp-1 md:text-[16px]">{title}</span>
        </div>
        <div className="hidden gap-1 md:flex">
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`} text={tag} />
          ))}
        </div>
        <div className="flex items-end justify-between">
          <span className="text-gray400 font-label-xs">
            제작일 | <time dateTime={isoDate}>{formattedDate}</time>
          </span>
          <Popover placement="top-end">
            <Popover.Trigger popoverKey="menu">
              <IconButton icon="IC_Download" variant="ghost" ariaLabel="파일 다운" />
            </Popover.Trigger>
            <Popover.Content popoverKey="menu">
              {close => (
                <div role="menu">
                  {fileUrls.map((url, index) => {
                    const extensionMatch = url.match(/\.(\w+)(\?|$)/);
                    const extension = extensionMatch ? extensionMatch[1].toUpperCase() : 'FILE';

                    return (
                      <button
                        key={`${id}-file-${index}`}
                        role="menuitem"
                        onClick={() => {
                          handleDownload(url, extension);
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
    </div>
  );
}

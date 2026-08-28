import Divider from '@/shared/ui/Divider/Divider';
import { formatDate } from '@/shared/utils/formatDate';
import { Card } from '@/types/card.types';
import Image from 'next/image';

import BackButton from './BackButton';
import DownloadSection from './DownloadSection';
import TagSection from './TagSection';

export default function FileIdPage({ id, title, tags, tmi, fileUrls, thumbnail, createdAt }: Card) {
  const { formattedDate, isoDate } = formatDate(createdAt);

  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <article className="w-full md:max-w-200 lg:max-w-300">
        <div className="flex w-full justify-between">
          <h1 className="mb-5 text-2xl font-bold md:text-3xl">{title}</h1>
          <BackButton />
        </div>
        <div className="relative h-80 w-full">
          <Image
            src={thumbnail}
            alt={`${title}`}
            fill
            className="object-contain"
            priority
            // h-80 + object-contain 이라 정사각 원본은 320px, 가로가 긴 원본도 최대 약 570px 로 그려진다.
            sizes="(min-width: 768px) 570px, 100vw"
          />
        </div>
        <Divider className="my-5" />
        <div className="flex w-full px-4">
          <div className="flex w-full flex-col items-start gap-4">
            <TagSection tags={tags} />
            <DownloadSection id={id} title={title} fileUrls={fileUrls} />
          </div>
          <div className="font-label-sm shrink-0 pl-1">
            <span>제작일: </span>
            <time dateTime={isoDate} className="text-gray700">
              {formattedDate}
            </time>
          </div>
        </div>
        <Divider className="my-5" />
        <div className="w-full px-4">
          <span className="whitespace-pre-wrap">{tmi}</span>
        </div>
      </article>
    </main>
  );
}

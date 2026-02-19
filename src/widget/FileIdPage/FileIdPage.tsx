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
    <main className="mx-auto mt-20 flex min-h-screen w-full flex-col items-center gap-5 md:mt-25 md:px-4">
      <div className="w-full">
        <BackButton />
      </div>
      <div className="relative h-100 w-full max-w-100">
        <Image src={thumbnail} alt={`${title} 이미지`} fill className="object-contain" priority />
      </div>
      <Divider />
      <div className="flex w-full px-4">
        <div className="flex w-full flex-col items-start gap-4">
          <h1 className="text-gray900 w-full text-2xl font-bold md:text-3xl">{title}</h1>
          <TagSection tags={tags} />
          <div className="font-label-sm w-full pl-1">
            <span>제작일: </span>
            <time dateTime={isoDate} className="text-gray600">
              {formattedDate}
            </time>
          </div>
        </div>
        <DownloadSection id={id} title={title} fileUrls={fileUrls} />
      </div>
      <Divider />
      <div className="w-full px-4">
        <span className="whitespace-pre-wrap">{tmi}</span>
      </div>
    </main>
  );
}

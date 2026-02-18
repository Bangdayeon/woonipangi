import LinkButton from '@/shared/ui/LinkButton/LinkButton';
import { ReactNode } from 'react';

import Keycap from './Keycap';

export default function Keyboard({
  onKeyClick,
}: {
  onKeyClick: (label: string, image: string, extra?: ReactNode) => void;
}) {
  return (
    <div className="flex h-70 w-90 md:w-100 lg:w-140">
      <div className="relative">
        <Keycap
          label="안녕"
          color="#FFD61E"
          darkColor="#FDC81B"
          className="absolute top-0 left-10 -rotate-3 md:-rotate-4"
          onClick={() => onKeyClick('안녕', '/images/woonie_smile.png')}
        />
        <Keycap
          label="반가워"
          color="#1BBF39"
          darkColor="#16932B"
          className="absolute top-7 left-39 -rotate-6 md:top-7 md:left-43 md:-rotate-8 lg:top-9 lg:left-48"
          onClick={() => onKeyClick('반가워', '/images/pang_horray.png')}
        />
        <Keycap
          label="우니"
          color="#EADDC0"
          darkColor="#C7B997"
          className="absolute top-21 left-13 -rotate-3 md:top-28 md:left-18 md:-rotate-6 lg:top-32 lg:left-20"
          onClick={() =>
            onKeyClick(
              '우니',
              '/images/woonie_palm.png',
              <LinkButton
                href="/files?character=woonie"
                label="우니의 다양한 모습 보러가기 >>"
                size="sm"
              />
            )
          }
        />
        <Keycap
          label="팡이"
          color="#3283EA"
          darkColor="#286FB9"
          className="absolute top-28 left-42 -rotate-6 md:top-34 md:left-52 md:-rotate-8 lg:top-40 lg:left-58 lg:-rotate-9"
          onClick={() =>
            onKeyClick(
              '팡이',
              '/images/pang_fly.png',
              <LinkButton
                href="/files/?character=pang"
                label="팡이의 다양한 모습 보러가기 >>"
                size="sm"
              />
            )
          }
        />
      </div>
    </div>
  );
}

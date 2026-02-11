import SVGIcon from '@/shared/ui/Icon/SVGIcon';
import Image from 'next/image';
import Link from 'next/link';

import Divider from '../Divider/Divider';

export default function Footer() {
  return (
    <footer className="bg-gray700 text-gray100 flex gap-10 p-7">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <Image src="/Images/wp_01.png" alt="로고" width={80} height={80} />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <SVGIcon icon="IC_Mail" />
              <a href="mailto:dybang00@gmail.com">dybang00@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <SVGIcon icon="IC_Instagram" />
              <a href="https://www.instagram.com/woonipang2?igsh=cGkzdjZ3ajFyZTAw&utm_source=qr">
                @wooniepang2
              </a>
            </div>
          </div>
        </div>
        <span>© 2021 Bangdayeon</span>
      </div>
      <div className="flex flex-col gap-2 text-left">
        <span className="font-semibold">MENU</span>
        <Divider color="bg-gray400" />
        <nav className="flex flex-col gap-1" aria-label="메뉴">
          <Link href="/">홈</Link>
          <Link href="/intro">캐릭터 소개</Link>
          <Link href="/files">캐릭터 파일</Link>
          <Link href="/bg-files">배경 파일</Link>
        </nav>
      </div>
    </footer>
  );
}

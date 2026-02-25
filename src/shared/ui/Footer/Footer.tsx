import SVGIcon from '@/shared/ui/Icon/SVGIcon';
import Link from 'next/link';

import Divider from '../Divider/Divider';

export default function Footer() {
  return (
    <footer className="bg-gray700 text-gray100 bottom-0 flex h-fit flex-col gap-5 p-7 md:flex-row md:gap-10 md:py-10">
      <div className="flex gap-10" aria-label="메뉴">
        {/* 메뉴 */}
        <div className="flex flex-col gap-5">
          <div className="font-body-sm md:font-body-md flex flex-col gap-2 text-left">
            <span className="font-semibold">MENU</span>
            <Divider color="bg-gray400" />
            <nav className="flex flex-col gap-1" aria-label="푸터 메뉴">
              <Link href="/">홈</Link>
              <Link href="/files">마스코트 모음</Link>
              <Link href="/intro">마스코트 소개</Link>
              <Link href="/ask">문의</Link>
            </nav>
          </div>
        </div>
      </div>
      {/* 연락처 */}
      <nav className="font-body-sm md:font-body-md flex flex-col gap-1" aria-label="연락처">
        <div className="flex items-center gap-1">
          <SVGIcon icon="IC_Mail" aria-hidden={true} />
          <a href="mailto:dybang00@gmail.com">dybang00@gmail.com</a>
        </div>
        <div className="flex items-center gap-1">
          <SVGIcon icon="IC_Instagram" aria-hidden={true} />
          <a href="https://www.instagram.com/wooniepang2" target="_blank" rel="noopener noreferrer">
            @wooniepang2
          </a>
        </div>
      </nav>
      <nav className="font-body-sm md:font-body-md flex flex-col gap-1" aria-label="법적 고지">
        <Link href="/terms">서비스 이용약관</Link>
        <Link href="/privacy">개인정보 처리방침</Link>
      </nav>
    </footer>
  );
}

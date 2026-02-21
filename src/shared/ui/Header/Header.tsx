'use client';

import Logo from '@/assets/images/LogoWithText.png';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import IconButton from '../IconButton/IconButton';
import LinkButton from '../LinkButton/LinkButton';
import Popover from '../Popover/Popover';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // 스크롤 위치가 0보다 크면 배경색과 블러를 활성화
    };

    // 초기 실행
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 flex h-15 items-center justify-between px-5 md:h-20 md:px-8',
        isScrolled
          ? 'bg-white/50 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] backdrop-blur-[1px]'
          : 'bg-transparent backdrop-blur-none'
      )}
    >
      <Link href="/" aria-label="메인으로 이동" className="relative h-8 w-31 md:h-11 md:w-44.5">
        <Image src={Logo} alt="" fill className="cursor-pointer object-contain" />
      </Link>
      <nav className="flex items-center gap-2" aria-label="주요 메뉴">
        <Popover>
          <Popover.Trigger popoverKey="header_menu">
            <IconButton
              icon="IC_Menu"
              variant="secondary"
              ariaLabel="헤더 메뉴 열기"
              aria-haspopup="menu"
              aria-controls="header-nav-menu"
            />
          </Popover.Trigger>
          <Popover.Content popoverKey="header_menu" transparent>
            {close => (
              <nav
                role="menu"
                id="header-nav-menu"
                aria-label="헤더 내비게이션"
                className="mr-1 flex flex-col gap-2 p-0.5 py-1"
              >
                <LinkButton
                  icon="IC_Image_Folder"
                  label="마스코트 모음"
                  href="/files"
                  radius="full"
                  variant="secondary"
                  className="shadow-[0_1px_3px_1px_rgba(0,0,0,0.08),0_1px_5px_2px_rgba(0,0,0,0.02)]"
                  onClick={close}
                />
                <LinkButton
                  icon="IC_Stream"
                  label="마스코트 소개"
                  href="/intro"
                  radius="full"
                  variant="secondary"
                  className="shadow-[0_1px_3px_1px_rgba(0,0,0,0.08),0_1px_5px_2px_rgba(0,0,0,0.02)]"
                  onClick={close}
                />
                <LinkButton
                  icon="IC_Mail"
                  label="문의"
                  href="/ask"
                  radius="full"
                  variant="secondary"
                  className="shadow-[0_1px_3px_1px_rgba(0,0,0,0.08),0_1px_5px_2px_rgba(0,0,0,0.02)]"
                  onClick={close}
                />
              </nav>
            )}
          </Popover.Content>
        </Popover>
      </nav>
      {/* 하단 그라데이션 경계 */}
      <div className="via-gray200/40 absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </header>
  );
};

export default Header;

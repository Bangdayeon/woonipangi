'use client';

import Logo from '@/assets/images/LogoWithText.png';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button/Button';
import LinkButton from '../LinkButton/LinkButton';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-15 items-center justify-between bg-transparent px-4 md:h-20 md:px-4">
      <Link href="/" aria-label="메인으로 이동" className="relative h-8 w-31 md:h-13 md:w-44.5">
        <Image src={Logo} alt="" fill className="cursor-pointer object-contain" />
      </Link>
      <nav className="flex items-center gap-2" aria-label="주요 메뉴">
        {/* <Dropdown
          options={[
            { label: '한국어', value: '한국어' },
            { label: 'Eng', value: 'Eng' },
          ]}
        /> */}

        <LinkButton
          icon="IC_Image_Folder"
          label="마스코트 모음"
          href="/files"
          radius="full"
          variant="secondary"
          className="hidden! md:flex!"
        />
        <LinkButton
          icon="IC_Image_Folder"
          label="마스코트 모음"
          href="/files"
          radius="full"
          size="sm"
          variant="secondary"
          className="md:hidden"
        />
        <Button
          icon="IC_Mail"
          label="문의"
          radius="full"
          variant="secondary"
          className="hidden! md:flex!"
        />
        <Button
          icon="IC_Mail"
          label="문의"
          radius="full"
          size="sm"
          variant="secondary"
          className="md:hidden"
        />
      </nav>
    </header>
  );
};

export default Header;

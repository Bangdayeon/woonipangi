'use client';

import Logo from '@/assets/images/LogoWithText.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button/Button';
import LinkButton from '../LinkButton/LinkButton';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between bg-transparent px-4 md:h-30 md:px-8">
      <motion.div
        className="relative h-12 w-42 md:h-18 md:w-58.75"
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Link href="/" aria-label="메인으로 이동">
          <Image src={Logo} alt="" fill className="cursor-pointer" />
        </Link>
      </motion.div>
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
        />
        <Button icon="IC_Mail" label="문의" radius="full" variant="secondary" />
      </nav>
    </header>
  );
};

export default Header;

'use client';

import Logo from '@/assets/images/LogoWithText.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconButton from '../IconButton/IconButton';

const Header = () => {
  const route = useRouter();
  return (
    <div className="sticky top-0 right-0 left-0 z-50 flex h-16 items-center justify-between bg-white px-8 shadow-md">
      <button>
        <Image
          src={Logo}
          alt="로고"
          width={190}
          height={42}
          className="cursor-pointer"
          onClick={() => route.push('/home')}
        />
      </button>
      <div className="flex gap-4">
        <nav>홈</nav>
        <nav>캐릭터 소개</nav>
        <nav>파일 다운</nav>
      </div>
      <div className="flex items-center gap-2">
        {/* <Dropdown
          options={[
            { label: '한국어', value: '한국어' },
            { label: 'Eng', value: 'Eng' },
          ]}
        /> */}
        <IconButton variant="secondary" size="lg" icon="IC_Account" ariaLabel="마이페이지" />
      </div>
    </div>
  );
};

export default Header;

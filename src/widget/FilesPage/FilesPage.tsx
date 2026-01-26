'use client';

import Input from '@/shared/ui/Input/Input';
import { useState } from 'react';

export default function FilesPage() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Input
        id="files-search"
        aria-label="캐릭터 파일 검색"
        value={value}
        placeholder="검색어를 입력해주세요"
        onChange={e => setValue(e.target.value)}
        icon="IC_Search"
      />
      <span>캐릭터 파일 다운 페이지</span>
    </div>
  );
}

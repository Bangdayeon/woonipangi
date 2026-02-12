import FilesPage from '@/widget/FilesPage/FilesPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    // TODO: 추후 수정
    <Suspense fallback={<div>Loading...</div>}>
      <FilesPage />
    </Suspense>
  );
}

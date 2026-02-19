'use client';

import { useSafeBack } from '@/shared/hooks/useSafeBack';
import Button from '@/shared/ui/Button/Button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const handleSafeBack = useSafeBack('/files');

  return (
    <Button icon="IC_Arrow_Back" variant="secondary" label="목록으로" onClick={handleSafeBack} />
  );
}

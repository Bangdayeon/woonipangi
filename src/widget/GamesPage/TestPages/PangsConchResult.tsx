'use client';

import Button from '@/shared/ui/Button/Button';
import { useToast } from '@/shared/ui/Toast';
import { useState } from 'react';

const getFileName = () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `pangsconch${yy}${MM}${dd}${HH}${mm}${ss}.png`;
};

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function PangsConchResult({
  question,
  result,
}: {
  question: string;
  result: string;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const getMemeUrl = () =>
    `/api/meme?question=${encodeURIComponent(question)}&result=${encodeURIComponent(result)}`;

  const handleSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      const res = await fetch(getMemeUrl());
      if (!res.ok) throw new Error(`이미지 생성 실패: ${res.status}`);
      const blob = await res.blob();
      const fileName = getFileName();

      if (isIOS()) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file] });
          showToast({ message: '저장 성공!', type: 'success' });
        } else {
          const objectUrl = URL.createObjectURL(blob);
          const newTab = window.open(objectUrl, '_blank');
          if (!newTab) {
            showToast({
              message: '팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.',
              type: 'error',
            });
          } else {
            showToast({ message: '이미지를 길게 눌러 저장하세요!', type: 'success' });
          }
          setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
        }
      } else {
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(objectUrl);
        showToast({ message: '이미지 저장 성공!', type: 'success' });
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') return;
      console.error('이미지 저장 실패:', error);
      showToast({ message: '이미지 저장에 실패했어요.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 mb-20 flex flex-col items-center gap-10 text-center text-[16px] font-semibold md:text-xl">
      <div className="relative w-80 md:w-150" style={{ aspectRatio: '1 / 1' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getMemeUrl()}
          alt="팡이고둥 밈"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          draggable={false}
        />
      </div>

      <Button
        onClick={handleSave}
        label={isSaving ? '저장 중...' : '저장하기'}
        disabled={isSaving}
      />
    </div>
  );
}

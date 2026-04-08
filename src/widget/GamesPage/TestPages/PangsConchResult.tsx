'use client';

import Button from '@/shared/ui/Button/Button';
import { useToast } from '@/shared/ui/Toast';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

// 공통 텍스트 스타일
const overlayTextStyle: React.CSSProperties = {
  color: 'white',
  fontWeight: 400,
  letterSpacing: '-0.5px',
  textShadow: `
    -1.5px -1.5px 0 black,
    1.5px -1.5px 0 black,
    -1.5px  1.5px 0 black,
    1.5px  1.5px 0 black,
    0px  1.5px 0 black,
    1.5px  0px 0 black,
    0px -1.5px 0 black,
    -1.5px  0px 0 black
  `,
  fontSize: 'clamp(14px, 2.5vw, 24px)',
  whiteSpace: 'pre-wrap',
};

// 파일명
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

export default function PangsConchResult({
  question,
  result,
}: {
  question: string;
  result: string;
}) {
  const memeRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    if (!memeRef.current || isSaving) return;
    try {
      setIsSaving(true);

      // 이미지 로드 전 저장 시도 방어
      const img = memeRef.current.querySelector('img');
      if (img) {
        if (!img.complete) {
          await new Promise<void>((resolve, reject) => {
            const cleanup = () => {
              img.removeEventListener('load', handleLoad);
              img.removeEventListener('error', handleError);
            };

            const handleLoad = () => {
              cleanup();
              resolve();
            };

            const handleError = () => {
              cleanup();
              reject(new Error('meme image failed to load'));
            };

            img.addEventListener('load', handleLoad);
            img.addEventListener('error', handleError);
          });
        } else if (img.naturalWidth === 0) {
          throw new Error('meme image failed to load');
        }
      }
      await document.fonts.ready;
      await new Promise(r => requestAnimationFrame(r));

      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = getFileName();
      link.click();
      showToast({
        message: '이미지 저장 성공!',
        type: 'success',
      });
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      showToast({
        message: '이미지 저장에 실패..',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 mb-20 flex flex-col items-center gap-10 text-center text-[16px] font-semibold md:text-xl">
      <div ref={memeRef} className="relative w-80 md:w-150" style={{ aspectRatio: '1 / 1' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/services/pang_conch_meme.jpg"
          crossOrigin="anonymous"
          loading="lazy" // lazy load
          decoding="async" // 렌더 최적화
          alt="팡이고둥 이미지"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          draggable={false}
        />

        {/* 질문 텍스트 */}
        <div
          className="absolute top-[42%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center md:top-[45%]"
          style={{
            ...overlayTextStyle,
            lineHeight: '1.2',
          }}
        >
          - {question}
        </div>

        {/* 답변 텍스트 */}
        <div
          className="absolute bottom-[4%] left-1/2 w-full -translate-x-1/2 text-center md:bottom-[2%]"
          style={{
            ...overlayTextStyle,
            lineHeight: '1.2',
          }}
        >
          - {result}
        </div>
      </div>

      <Button
        onClick={handleSave}
        label={isSaving ? '저장 중...' : '저장하기'}
        disabled={isSaving}
      />
    </div>
  );
}

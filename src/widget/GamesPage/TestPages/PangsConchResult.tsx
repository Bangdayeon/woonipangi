import Button from '@/shared/ui/Button/Button';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function PangsConchResult({
  question,
  result,
}: {
  question: string;
  result: string;
}) {
  const memeRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!memeRef.current || isSaving) return;
    try {
      setIsSaving(true);
      // 렌더 안정화(Image 컴포넌트 완료 대기)
      await new Promise(r => requestAnimationFrame(r));
      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: null,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'pang_conch_meme.png';
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 mb-20 flex flex-col items-center gap-10 text-center text-[16px] font-semibold md:text-xl">
      <div ref={memeRef} className="relative inline-block h-80 w-80 md:h-150 md:w-150">
        <Image
          src="/images/services/pang_conch_meme.jpg"
          alt="Meme"
          fill
          sizes="(max-width: 768px) 320px, 600px"
          style={{ objectFit: 'contain' }}
          draggable={false}
        />

        {/* 질문 텍스트 */}
        <div
          className="absolute top-[40%] left-0 w-full text-center text-white md:top-[45%]"
          style={{
            fontFamily: '굴림, Gulim, sans-serif',
            WebkitTextStroke: '1px black',
            fontSize: 'clamp(16px, 2.5vw, 24px)', // 화면 크기에 따라 최소 16px, 최대 24px
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          - {question}
        </div>

        {/* 답변 텍스트 */}
        <div
          className="absolute bottom-[1%] left-0 w-full text-center text-white"
          style={{
            fontFamily: '굴림, Gulim, sans-serif',
            WebkitTextStroke: '1px black',
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
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

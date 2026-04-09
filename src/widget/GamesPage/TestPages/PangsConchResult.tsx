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

/** Canvas에 줄바꿈 텍스트를 그리는 헬퍼 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  centerY: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const totalHeight = lines.length * lineHeight;
  const startY = centerY - totalHeight / 2 + lineHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    const y = startY + i * lineHeight;
    // 외곽선 (검정)
    ctx.strokeText(lines[i], x, y);
    // 본문 (흰색)
    ctx.fillText(lines[i], x, y);
  }
}

/** 이미지를 fetch → blob → ObjectURL → HTMLImageElement 로드 */
async function loadImageViaBlob(src: string): Promise<HTMLImageElement> {
  const response = await fetch(src);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('이미지 로드 실패'));
    };
    img.src = objectUrl;
  });
}

/** Canvas로 밈 이미지를 직접 생성 */
async function generateMemeCanvas(question: string, result: string): Promise<Blob> {
  const SIZE = 800; // 정사각형 출력 크기
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // 배경 이미지 그리기 (blob 경유로 CORS 우회)
  const img = await loadImageViaBlob('/images/services/pang_conch_meme.jpg');
  ctx.drawImage(img, 0, 0, SIZE, SIZE);

  // 텍스트 공통 설정
  const fontSize = 22;
  ctx.font = `400 ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.lineJoin = 'round';

  const maxWidth = SIZE * 0.9;
  const lineHeight = fontSize * 1.4;

  // 질문 텍스트: 세로 42% 위치
  drawWrappedText(ctx, `- ${question}`, SIZE / 2, SIZE * 0.42, maxWidth, lineHeight);

  // 결과 텍스트: 하단 4% 위 (세로 96% 기준점, 여러 줄이면 위로 확장)
  // 먼저 줄 수를 계산해서 시작점 조정
  const resultText = `- ${result}`;
  const words = resultText.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const totalResultHeight = lines.length * lineHeight;
  // 마지막 줄 하단이 SIZE * 0.97에 오도록
  const resultCenterY = SIZE * 0.97 - totalResultHeight / 2;
  drawWrappedText(ctx, resultText, SIZE / 2, resultCenterY, maxWidth, lineHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('blob 변환 실패'))),
      'image/png'
    );
  });
}

export default function PangsConchResult({
  question,
  result,
}: {
  question: string;
  result: string;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      const blob = await generateMemeCanvas(question, result);
      const fileName = getFileName();

      if (isIOS()) {
        // iOS: Web Share API 시도
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file] });
          showToast({ message: '저장 성공!', type: 'success' });
        } else {
          // fallback: 새 탭에서 열기
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
        // Android / PC: 직접 다운로드
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
      {/* 미리보기는 기존 img 태그 그대로 유지 */}
      <div className="relative w-80 md:w-150" style={{ aspectRatio: '1 / 1' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/services/pang_conch_meme.jpg"
          alt="팡이고둥 이미지"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          draggable={false}
        />
        <div
          className="absolute top-[42%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center md:top-[45%]"
          style={{
            color: 'white',
            fontWeight: 400,
            letterSpacing: '-0.5px',
            textShadow: `-1.5px -1.5px 0 black, 1.5px -1.5px 0 black, -1.5px 1.5px 0 black, 1.5px 1.5px 0 black`,
            fontSize: 'clamp(14px, 2.5vw, 24px)',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.2',
          }}
        >
          - {question}
        </div>
        <div
          className="absolute bottom-[4%] left-1/2 w-full -translate-x-1/2 text-center md:bottom-[2%]"
          style={{
            color: 'white',
            fontWeight: 400,
            letterSpacing: '-0.5px',
            textShadow: `-1.5px -1.5px 0 black, 1.5px -1.5px 0 black, -1.5px 1.5px 0 black, 1.5px 1.5px 0 black`,
            fontSize: 'clamp(14px, 2.5vw, 24px)',
            whiteSpace: 'pre-wrap',
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

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const question = searchParams.get('question') ?? '';
  const result = searchParams.get('result') ?? '';

  // 배경 이미지를 base64로 읽기
  // edge runtime에서는 fetch로 self-호출
  const imageUrl = new URL('/images/services/pang_conch_meme.jpg', req.url).toString();
  const imageRes = await fetch(imageUrl);
  const imageBuffer = await imageRes.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString('base64');
  const imageSrc = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    <div
      style={{
        width: '800px',
        height: '800px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 배경 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '800px',
          height: '800px',
          objectFit: 'cover',
        }}
      />

      {/* 질문 텍스트 - 42% 위치 */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '720px',
          textAlign: 'center',
          color: 'white',
          fontSize: '28px',
          fontWeight: 400,
          lineHeight: 1.3,
          textShadow:
            '-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0 2px 0 black, 2px 0 0 black, 0 -2px 0 black, -2px 0 0 black',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        - {question}
      </div>

      {/* 결과 텍스트 - 하단 */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '720px',
          textAlign: 'center',
          color: 'white',
          fontSize: '28px',
          fontWeight: 400,
          lineHeight: 1.3,
          textShadow:
            '-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0 2px 0 black, 2px 0 0 black, 0 -2px 0 black, -2px 0 0 black',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        - {result}
      </div>
    </div>,
    {
      width: 800,
      height: 800,
    }
  );
}

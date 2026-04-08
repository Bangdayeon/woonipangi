import Click from '@/assets/images/click.png';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @interface SliderProps
 */
interface SliderProps {
  baseSpeed?: number;
  boostSpeed?: number;
  boostDuration?: number;
}

const SLIDE_TEXTS: string[] = [
  '우니는 돼지라고 오해받는 것이 슬픕니다.',
  '팡이는 정말 동그란',
  '과제의 늪에 빠졌습니다! 살려주세요!',
  '방학이 얼마 남지 않았습니다.',
  '어떤 대학생은 잘 씻지 못합니다.',
  '행운의 편지를 발견한 당신은',
  '바른 자세를 유지하십시오! 척추 수술 비용 5천만원',
  '우니 The Horse🐎',
  '후회 남지 않을 대학 생활을 즐기십시오!',
];

export default function App({ baseSpeed = 4, boostSpeed = 10, boostDuration = 600 }: SliderProps) {
  const [isBoosting, setIsBoosting] = useState(false);
  const [showImage, setShowImage] = useState(true);

  // 텍스트를 랜덤하게 섞는 함수
  const shuffle = useCallback((array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  // 화면에 렌더링할 텍스트 상태 (초기에는 고정값)
  const [randomizedTexts, setRandomizedTexts] = useState<string[]>([
    ...SLIDE_TEXTS,
    ...SLIDE_TEXTS,
    ...SLIDE_TEXTS,
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number>(0);
  const xPosRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // 5초 후 이미지 자동 삭제
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (time: number) => {
      if (!scrollRef.current) return;

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const currentSpeed = isBoosting ? boostSpeed : baseSpeed;
      const moveAmount = currentSpeed * (deltaTime / 16.67);

      xPosRef.current -= moveAmount;

      // 전체 길이의 1/3 지점을 넘어가면 위치를 초기화
      const totalWidth = scrollRef.current.scrollWidth / 3;
      if (Math.abs(xPosRef.current) >= totalWidth) {
        xPosRef.current += totalWidth;

        // 위치 초기화 시점에 텍스트를 다시 랜덤하게 섞어서 보이지 않는 뒤쪽을 업데이트
        setRandomizedTexts(() => [
          ...shuffle(SLIDE_TEXTS),
          ...shuffle(SLIDE_TEXTS),
          ...shuffle(SLIDE_TEXTS),
        ]);
      }

      scrollRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      requestRef.current = requestAnimationFrame(move);
    };

    requestRef.current = requestAnimationFrame(move);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isBoosting, baseSpeed, boostSpeed, shuffle]);

  const handleBoost = () => {
    if (showImage) {
      setShowImage(false);
    }
    if (isBoosting) return;
    setIsBoosting(true);
    setTimeout(() => setIsBoosting(false), boostDuration);
  };

  return (
    <>
      {showImage && (
        <div onClick={handleBoost}>
          <Image
            src={Click}
            alt=""
            width={80}
            height={80}
            className="absolute top-35 left-1/2 z-40 -translate-x-1/2 animate-bounce cursor-pointer md:top-40"
            unoptimized
          />
          <div className="absolute top-25 z-30 flex h-20 w-full cursor-pointer bg-black/30 md:top-30 md:h-28" />
        </div>
      )}

      <div className="absolute top-25 flex w-full items-center justify-center overflow-hidden py-3 transition-colors duration-150 select-none hover:bg-black/30 md:top-30">
        <div
          onClick={handleBoost}
          className="w-full cursor-pointer transition-transform active:scale-95"
        >
          <div
            ref={scrollRef}
            className="flex items-center font-black tracking-tighter whitespace-nowrap"
            style={{
              willChange: 'transform',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            {randomizedTexts.map((text, index) => (
              <div key={`${text}-${index}`} className="shrink-0 px-2 md:px-3">
                <span
                  className={`text-5xl tracking-[calc(-0.08em)] transition-colors duration-300 md:text-7xl ${isBoosting ? 'text-yellow400' : ''} `}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

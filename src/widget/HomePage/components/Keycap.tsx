'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FRONT_BRIGHTNESS = 1;
const SIDE_BRIGHTNESS = 0.9;

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

interface KeycapProps {
  label: string;
  color: string;
  darkColor: string;
  paddingX?: number; // 텍스트 기준 수평 패딩 (px)
  paddingY?: number; // 텍스트 기준 수직 패딩 (px)
  className?: string;
  onClick?: () => void;
}

export default function Keycap({
  label,
  color,
  darkColor,
  paddingX = 36,
  paddingY = 28,
  className,
  onClick,
}: KeycapProps) {
  const [isPressed, setIsPressed] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });
  const { width: windowWidth } = useWindowSize();

  // ── 반응형 스케일 ───────────────────────────────────────────────
  const scale = Math.min(0.9, Math.max(0.9, windowWidth / 900));

  // 반응형 폰트 크기 (스케일 전 기준)
  const fontSize = Math.min(48, Math.max(22, 26 + (windowWidth - 400) / 40));

  // ── 텍스트 크기 측정 ────────────────────────────────────────────
  useEffect(() => {
    if (!textRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setTextSize({ width: Math.ceil(width), height: Math.ceil(height) });
    });
    ro.observe(textRef.current);
    return () => ro.disconnect();
  }, [label, fontSize]);

  // ── Top face 크기: 텍스트 + 패딩 ──────────────────────────────
  const topW = textSize.width > 0 ? textSize.width + paddingX * 2 : 224;
  const topH = textSize.height > 0 ? textSize.height + paddingY * 2 : 160;

  // ── 3D 파라미터 (top face 크기에 비례) ─────────────────────────
  const depth = Math.max(38, topH * 0.48); // 앞면 높이 (키캡 두께)
  const sideW = Math.max(26, topW * 0.42); // 옆면 너비

  const rotation = { rotateX: 45, rotateY: 0, rotateZ: 25 };

  return (
    <div className={`${className}`} style={{ perspective: '1600px' }}>
      <motion.div
        className="relative cursor-pointer select-none"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onClick={onClick}
        initial={rotation}
        animate={{
          ...rotation,
          z: isPressed ? -16 : 0,
          y: isPressed ? 10 : 0,
          scale,
          
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 10,  }}
        style={{
          transformStyle: 'preserve-3d',
          width: topW/5,
          height: topH/10, 
        }}
      >
        {/* ── 앞면 (Front face) ──────────────────────────────────── */}
        <div
          className='md:-ml-1 md:-mt-1'
          style={{
            position: 'absolute',
            left: -4,
            width: topW-4,
            height: depth,
            top: topH - 28,
            backgroundColor: darkColor,
            borderRadius: 10,
            filter: `brightness(${FRONT_BRIGHTNESS})`,
            transformOrigin: 'top center',
            transform: `rotateX(-75deg) translateY(${depth / 2}px)`,
          }}
        />

        {/* ── 오른쪽 옆면 (Right side face) ─────────────────────── */}
        <div
          className='md:-ml-1'
          style={{
            position: 'absolute',
            top: -14,
            height: topH - 14,
            width: sideW,
            left: topW - 14,
            backgroundColor: darkColor,
            borderRadius: 10,
            filter: `brightness(${SIDE_BRIGHTNESS})`,
            transformOrigin: 'left center',
            transform: `rotateY(77deg) translateX(${sideW / 2}px)`,
          }}
        />

        {/* ── 메인 키캡 상단 (Top face) ──────────────────────────── */}
        <div
          style={{
            position: 'relative',
            width: topW,
            height: topH,
            borderRadius: 20,
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* 텍스트 (ResizeObserver로 크기 측정) */}
          <span
            ref={textRef}
            style={{
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#000',
              transform: 'rotate(-0deg)',
              whiteSpace: 'nowrap',
              fontSize,
              display: 'inline-block',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

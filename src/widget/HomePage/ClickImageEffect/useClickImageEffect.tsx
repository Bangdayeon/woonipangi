'use client';

import { useCallback } from 'react';

import styles from './ClickImage.module.css';

const IMAGE_URL = '/images/pang_02.png';

export function useClickImageEffect() {
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const img = document.createElement('img');

    img.src = IMAGE_URL;
    img.alt = '';
    img.className = styles.effect;
    img.style.left = `${e.clientX}px`;
    img.style.top = `${e.clientY}px`;

    document.body.appendChild(img);

    const cleanup = () => img.remove();
    const fallbackTimer = setTimeout(cleanup, 1500);

    img.addEventListener(
      'animationend',
      () => {
        clearTimeout(fallbackTimer);
        cleanup();
      },
      { once: true }
    );
  }, []);

  return { onPointerDown };
}

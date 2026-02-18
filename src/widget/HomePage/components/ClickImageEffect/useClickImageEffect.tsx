'use client';

import { useCallback } from 'react';

import styles from './ClickImage.module.css';

const IMAGE_URLS = [
  '/images/click_pang_1.png',
  '/images/click_pang_2.png',
  '/images/click_pang_3.png',
];

export function useClickImageEffect() {
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const img = document.createElement('img');

    const randomImage = IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)];

    img.src = randomImage;
    img.alt = '';
    img.className = styles.effect;
    img.style.left = `${e.clientX}px`;
    img.style.top = `${e.clientY}px`;

    document.body.appendChild(img);

    const cleanup = () => img.remove();
    const fallbackTimer = setTimeout(cleanup, 1200);

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

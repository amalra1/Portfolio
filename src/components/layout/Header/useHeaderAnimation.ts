'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Header.module.css';

const SUN_DEGREES_PER_PIXEL = 0.25;
const SUN_SCRUB_SECONDS = 0.6;

export function useHeaderAnimation(ref: RefObject<HTMLElement | null>) {
  useMediaAnimation(() => {
    const sun = ref.current?.querySelector(`.${styles.sun}`);
    if (!sun) return;

    gsap.to(sun, {
      rotate: () => ScrollTrigger.maxScroll(window) * SUN_DEGREES_PER_PIXEL,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: SUN_SCRUB_SECONDS,
        invalidateOnRefresh: true,
      },
    });
  });
}

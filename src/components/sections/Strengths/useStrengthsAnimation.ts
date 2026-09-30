'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Strengths.module.css';

export function useStrengthsAnimation(ref: RefObject<HTMLUListElement | null>) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const cells = root.querySelectorAll(`.${styles.cell}`);
      gsap.set(cells, { y: 60, autoAlpha: 0, rotate: -1.5 });
      ScrollTrigger.batch(cells, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            rotate: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power4.out',
            overwrite: true,
          }),
      });
    },
    { scope: ref },
  );
}

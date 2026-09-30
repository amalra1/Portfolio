'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Interlude.module.css';

export function useInterludeAnimation(ref: RefObject<HTMLDivElement | null>) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const acrossViewport = {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      };
      gsap.fromTo(
        root.querySelector(`.${styles.media}`),
        { yPercent: -8 },
        { yPercent: 8, ease: 'none', scrollTrigger: acrossViewport },
      );
      gsap.from(root.querySelectorAll(`.${styles.content} > *`), {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });
      gsap.to(root.querySelector(`.${styles.sun}`), {
        rotate: 120,
        ease: 'none',
        scrollTrigger: acrossViewport,
      });
    },
    { scope: ref },
  );
}

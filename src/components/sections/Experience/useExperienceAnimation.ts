'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Experience.module.css';

export function useExperienceAnimation(
  ref: RefObject<HTMLOListElement | null>,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      gsap.fromTo(
        root.querySelector(`.${styles.progress}`),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      );
      root.querySelectorAll(`.${styles.body}`).forEach((body) => {
        gsap.from(body.children, {
          y: 24,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.7,
          scrollTrigger: { trigger: body, start: 'top 85%', once: true },
        });
      });
    },
    { scope: ref },
  );
}

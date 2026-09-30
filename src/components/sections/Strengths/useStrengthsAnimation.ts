'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import cellStyles from './SkillFlash.module.css';

const STAMP_EASE = 'back.out(2.4)';

export function useStrengthsAnimation(ref: RefObject<HTMLDivElement | null>) {
  useMediaAnimation(
    () => {
      const sheet = ref.current;
      if (!sheet) return;

      gsap.from(sheet, {
        y: 90,
        rotate: -4,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: sheet, start: 'top 88%', once: true },
      });

      const stamps = sheet.querySelectorAll(`.${cellStyles.stamp}`);
      gsap.set(stamps, { scale: 1.9, rotate: -35, autoAlpha: 0 });
      ScrollTrigger.batch(stamps, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            stagger: 0.14,
            duration: 0.55,
            ease: STAMP_EASE,
            overwrite: true,
          }),
      });
    },
    { scope: ref },
  );
}

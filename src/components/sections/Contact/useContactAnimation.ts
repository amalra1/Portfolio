'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Contact.module.css';

const SUN_TURN_DEGREES = 240;
const SUN_SCRUB_SECONDS = 0.6;

export function useContactAnimation(ref: RefObject<HTMLElement | null>) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;

      const title = root.querySelector(`.${styles.title}`);
      gsap.fromTo(
        title,
        { scale: 0.86, yPercent: 12 },
        {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: title,
            start: 'top bottom',
            end: 'top 35%',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        root.querySelector(`.${styles.sun}`),
        { rotate: -SUN_TURN_DEGREES / 2 },
        {
          rotate: SUN_TURN_DEGREES / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: SUN_SCRUB_SECONDS,
          },
        },
      );

      gsap.from(root.querySelectorAll(`.${styles.grid} > * > *`), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.7,
        scrollTrigger: {
          trigger: root.querySelector(`.${styles.grid}`),
          start: 'top 85%',
          once: true,
        },
      });

      gsap.fromTo(
        root.querySelector(`.${styles.giant}`),
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.querySelector(`.${styles.band}`),
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );
}

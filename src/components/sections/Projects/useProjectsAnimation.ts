'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import type { ProjectCategory } from '@/types/portfolio';
import styles from './Projects.module.css';

const DESKTOP_SLIDE_DISTANCE = 60;

export function useProjectsAnimation(
  listRef: RefObject<HTMLUListElement | null>,
  category: ProjectCategory,
) {
  useMediaAnimation(
    ({ desktop }) => {
      const list = listRef.current;
      if (!list) return;
      const items = list.querySelectorAll<HTMLElement>(`.${styles.item}`);
      items.forEach((item, i) => {
        const slideFrom =
          i % 2 === 0 ? -DESKTOP_SLIDE_DISTANCE : DESKTOP_SLIDE_DISTANCE;
        gsap.set(item.querySelector(`.${styles.figure}`), {
          x: desktop ? slideFrom : 0,
          y: desktop ? 0 : 40,
          autoAlpha: 0,
        });
        gsap.set(item.querySelector(`.${styles.body}`), {
          y: 30,
          autoAlpha: 0,
        });
      });
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((item) => {
            gsap
              .timeline()
              .to(item.querySelector(`.${styles.figure}`), {
                x: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: 'power4.out',
                overwrite: true,
              })
              .to(
                item.querySelector(`.${styles.body}`),
                { y: 0, autoAlpha: 1, duration: 0.7, overwrite: true },
                '-=0.6',
              );
          });
        },
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: listRef, dependencies: [category], revertOnUpdate: true },
  );
}

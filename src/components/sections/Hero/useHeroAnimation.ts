'use client';

import type { RefObject } from 'react';
import { gsap, SplitText } from '@/lib/gsap';
import { introReady } from '@/lib/preloader';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Hero.module.css';

const PORTRAIT_SINK = 14;
const PORTRAIT_SINK_MOBILE = 8;
const CHAR_RISE = {
  yPercent: 115,
  duration: 1.1,
  stagger: { each: 0.035, from: 'start' },
} as const;

export function useHeroAnimation(ref: RefObject<HTMLElement | null>) {
  useMediaAnimation(
    ({ mobile }) => {
      const root = ref.current;
      if (!root) return;

      const lines = root.querySelectorAll<HTMLElement>(`.${styles.line}`);
      const outlines = root.querySelectorAll<HTMLElement>(`.${styles.outline}`);
      const figure = root.querySelector(`.${styles.figure}`);
      const ink = root.querySelector(`.${styles.ink}`);
      const sun = root.querySelector(`.${styles.sun}`);
      const meta = root.querySelectorAll(`.${styles.meta} > *`);
      const bottom = root.querySelectorAll(`.${styles.bottom} > *`);
      const cueLine = root.querySelector(`.${styles.cueLine}`);

      gsap.set([meta, bottom], { autoAlpha: 0 });
      gsap.set(figure, { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(ink, { clipPath: 'inset(0 0 100% 0)' });

      const playIntro = () => {
        const split = SplitText.create(lines, {
          type: 'chars',
          charsClass: 'hero-char',
          aria: 'auto',
        });
        const outlineSplit = SplitText.create(outlines, {
          type: 'chars',
          charsClass: 'hero-char',
          aria: 'none',
        });
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from(split.chars, { ...CHAR_RISE })
          .from(outlineSplit.chars, { ...CHAR_RISE }, '<')
          .to(
            figure,
            { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut' },
            '-=0.9',
          )
          .from(sun, { scale: 0.6, rotate: -40, duration: 1.4 }, '<')
          .to(
            ink,
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.1,
              ease: 'power2.inOut',
            },
            '-=0.5',
          )
          .to(meta, { autoAlpha: 1, stagger: 0.08, duration: 0.6 }, '-=0.6')
          .to(bottom, { autoAlpha: 1, stagger: 0.1, duration: 0.6 }, '<');
      };
      Promise.all([document.fonts.ready, introReady]).then(playIntro);

      gsap.fromTo(
        cueLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        },
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(
          [lines[0], ...outlines],
          { xPercent: mobile ? -6 : -12, ease: 'none' },
          0,
        )
        .to(lines[1], { xPercent: mobile ? 6 : 12, ease: 'none' }, 0)
        .to(
          [figure, ink],
          {
            yPercent: mobile ? PORTRAIT_SINK_MOBILE : PORTRAIT_SINK,
            ease: 'none',
          },
          0,
        )
        .to(sun, { rotate: 90, ease: 'none' }, 0)
        .to([meta, bottom], { autoAlpha: 0, ease: 'none', duration: 0.4 }, 0);
    },
    { scope: ref },
  );
}

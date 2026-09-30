'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './About.module.css';

const COLOR_FILTER = 'grayscale(0) contrast(1.15)';
const GRAYSCALE_FILTER = 'grayscale(1) contrast(1.15)';
const SHUFFLE_OFFSET_PERCENT = 8;
const SHUFFLE_TILT_DEGREES = 3;

export function useAboutAnimation(ref: RefObject<HTMLUListElement | null>) {
  useMediaAnimation(
    ({ hover }) => {
      const root = ref.current;
      if (!root || hover) return;

      const [lead, trailing] = gsap.utils.toArray<HTMLElement>(
        `.${styles.photo}`,
        root,
      );
      if (!lead || !trailing) return;
      const leadImage = lead.querySelector('img');
      const trailingImage = trailing.querySelector('img');

      gsap.set(lead, { zIndex: 2 });
      gsap.set(leadImage, { filter: COLOR_FILTER });

      gsap
        .timeline({
          defaults: { ease: 'power1.inOut', duration: 1 },
          scrollTrigger: {
            trigger: root,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        })
        .to(
          lead,
          {
            xPercent: -SHUFFLE_OFFSET_PERCENT,
            rotate: -SHUFFLE_TILT_DEGREES,
          },
          0,
        )
        .to(
          trailing,
          { xPercent: SHUFFLE_OFFSET_PERCENT, rotate: SHUFFLE_TILT_DEGREES },
          0,
        )
        .set(trailing, { zIndex: 3 }, 1)
        .to([lead, trailing], { xPercent: 0, rotate: 0 }, 1)
        .to(leadImage, { filter: GRAYSCALE_FILTER }, 1)
        .to(trailingImage, { filter: COLOR_FILTER }, 1);
    },
    { scope: ref },
  );
}

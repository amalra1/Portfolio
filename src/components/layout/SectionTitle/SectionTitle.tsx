'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cx } from '@/lib/classNames';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import type { SectionTitleProps } from '@/types/components/layout';
import styles from './SectionTitle.module.css';

const DRIFT_EXIT_RATIO = 0.4;

export default function SectionTitle({
  id,
  children,
  drift = 5,
  className,
}: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useMediaAnimation(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.from(el.querySelector(`.${styles.lineInner}`), {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
      gsap.fromTo(
        el,
        { xPercent: drift },
        {
          xPercent: -drift * DRIFT_EXIT_RATIO,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [children, drift] },
  );

  return (
    <h2 id={id} ref={ref} className={cx(styles.title, 'display', className)}>
      <span className={styles.line}>
        <span className={styles.lineInner}>{children}</span>
      </span>
    </h2>
  );
}

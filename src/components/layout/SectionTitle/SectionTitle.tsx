'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import styles from './SectionTitle.module.css';

type Props = {
  id: string;
  children: string;
  /** Horizontal drift in percent while the title crosses the viewport. */
  drift?: number;
  className?: string;
};

/** Giant display heading that rises from a mask and drifts with the scroll. */
export default function SectionTitle({
  id,
  children,
  drift = 5,
  className,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce } = ctx.conditions ?? {};
        if (reduce) return;
        const inner = el.querySelector(`.${styles.lineInner}`);
        gsap.from(inner, {
          yPercent: 110,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
        gsap.fromTo(
          el,
          { xPercent: drift },
          {
            xPercent: -drift * 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref, dependencies: [children, drift] },
  );

  return (
    <h2
      id={id}
      ref={ref}
      className={`${styles.title} display ${className ?? ''}`}
    >
      <span className={styles.line}>
        <span className={styles.lineInner}>{children}</span>
      </span>
    </h2>
  );
}

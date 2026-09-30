'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import { photos } from '@/data/images';
import type { PortfolioData } from '@/data/types';
import { TribalSun } from '@/components/motion/Ornament';
import styles from './Interlude.module.css';

type Props = { data: PortfolioData['interlude'] };

export default function Interlude({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const src = photos[data.key];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce } = ctx.conditions ?? {};
        if (reduce) return;
        gsap.fromTo(
          root.querySelector(`.${styles.media}`),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
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
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: ref },
  );

  if (!src) return null;

  return (
    <div ref={ref} className={styles.band} aria-label={data.caption}>
      <div className={styles.media}>
        <Image src={src} alt={data.caption} sizes="100vw" />
      </div>
      <span className={styles.tint} aria-hidden="true" />
      <TribalSun className={styles.sun} />
      <div className={styles.content}>
        <p className={`${styles.title} gothic`}>{data.title}</p>
        <span className={`${styles.caption} mono`}>{data.caption}</span>
      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { HERO_SECTION_ID } from '@/constants/sections';
import { heroImage } from '@/data/images';
import { cx } from '@/lib/classNames';
import TribalSun from '@/components/ornaments/TribalSun/TribalSun';
import type { HeroProps } from '@/types/components/sections';
import { useHeroAnimation } from './useHeroAnimation';
import styles from './Hero.module.css';

export default function Hero({ data }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  useHeroAnimation(ref);

  return (
    <section
      id={HERO_SECTION_ID}
      ref={ref}
      className={cx(styles.hero, 'band-red')}
      aria-label={data.fullName}
    >
      <TribalSun className={styles.sun} />

      <div className={cx(styles.meta, 'mono')}>
        <span>
          <strong>{data.role}</strong>
        </span>
        <span>{data.location}</span>
        <span>{new Date().getFullYear()} — Portfolio</span>
      </div>

      <div className={styles.stage}>
        <h1 className={cx(styles.name, 'display')}>
          <span className={cx(styles.line, styles.first)}>
            {data.firstName}
          </span>
          <span className={styles.figure} aria-hidden="true">
            <Image
              src={heroImage}
              alt=""
              priority
              className={styles.photo}
              sizes="(min-width: 900px) 20vw, 72vw"
            />
          </span>
          <span className={cx(styles.line, styles.last)}>{data.lastName}</span>
        </h1>
      </div>

      <div className={cx(styles.bottom, 'mono')}>
        <span className={styles.cue}>
          <span className={styles.cueLine} aria-hidden="true" />
          {data.scrollCue}
        </span>
        <p className={styles.tagline}>{data.tagline}</p>
      </div>
    </section>
  );
}

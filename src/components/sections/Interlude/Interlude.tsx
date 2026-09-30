'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { photos } from '@/data/images';
import { cx } from '@/lib/classNames';
import TribalSun from '@/components/ornaments/TribalSun/TribalSun';
import type { InterludeProps } from '@/types/components/sections';
import { useInterludeAnimation } from './useInterludeAnimation';
import styles from './Interlude.module.css';

export default function Interlude({ data }: InterludeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const src = photos[data.key];
  useInterludeAnimation(ref);

  if (!src) return null;

  return (
    <div ref={ref} className={styles.band} aria-label={data.caption}>
      <div className={styles.media}>
        <Image src={src} alt={data.caption} sizes="100vw" />
      </div>
      <span className={styles.tint} aria-hidden="true" />
      <TribalSun className={styles.sun} />
      <div className={styles.content}>
        <p className={cx(styles.title, 'gothic')}>{data.title}</p>
        <span className={cx(styles.caption, 'mono')}>{data.caption}</span>
      </div>
    </div>
  );
}

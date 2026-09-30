'use client';

import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { photos } from '@/data/images';
import { cx } from '@/lib/classNames';
import { scrollToTarget } from '@/lib/scroll';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import Parallax from '@/components/motion/Parallax/Parallax';
import ScrubWords from '@/components/motion/ScrubWords/ScrubWords';
import TribalThorn from '@/components/ornaments/TribalThorn/TribalThorn';
import type { AboutProps } from '@/types/components/sections';
import styles from './About.module.css';

const PARAGRAPH_KEY_LENGTH = 24;
const LEAD_PHOTO_PARALLAX = 4;
const TRAILING_PHOTO_PARALLAX = 9;

export default function About({ data }: AboutProps) {
  const lenis = useLenis();

  return (
    <Section id="about" label={data.label} titleId="about-title">
      <SectionTitle id="about-title">{data.title}</SectionTitle>

      <div className={styles.grid}>
        <div className={styles.text}>
          {data.paragraphs.map((paragraph) => (
            <ScrubWords
              key={paragraph.slice(0, PARAGRAPH_KEY_LENGTH)}
              className={styles.paragraph}
              start="top 85%"
              end="bottom 55%"
            >
              {paragraph}
            </ScrubWords>
          ))}
          <a
            href="#contact"
            className={cx(styles.cta, 'display')}
            onClick={(event) => {
              event.preventDefault();
              scrollToTarget('#contact', lenis);
            }}
          >
            {data.cta}
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <ul className={styles.photos}>
          {data.photos.map((photo, i) => {
            const src = photos[photo.key];
            if (!src) return null;
            return (
              <li key={photo.key} className={styles.photo}>
                <Parallax
                  amount={
                    i === 0 ? LEAD_PHOTO_PARALLAX : TRAILING_PHOTO_PARALLAX
                  }
                >
                  <Image
                    src={src}
                    alt={photo.caption}
                    sizes="(min-width: 900px) 28vw, 66vw"
                  />
                </Parallax>
                <TribalThorn className={styles.mark} />
                <span className={cx(styles.caption, 'mono')}>
                  {photo.caption}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

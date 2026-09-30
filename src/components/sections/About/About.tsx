'use client';

import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { scrollToTarget } from '@/lib/scroll';
import { photos } from '@/data/images';
import type { AboutData } from '@/data/types';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import ScrubWords from '@/components/motion/ScrubWords';
import Parallax from '@/components/motion/Parallax';
import { TribalThorn } from '@/components/motion/Ornament';
import styles from './About.module.css';

export default function About({ data }: { data: AboutData }) {
  const lenis = useLenis();

  return (
    <Section id="about" index="01" label={data.label} titleId="about-title">
      <SectionTitle id="about-title">{data.title}</SectionTitle>

      <div className={styles.grid}>
        <div className={styles.text}>
          {data.paragraphs.map((paragraph) => (
            <ScrubWords
              key={paragraph.slice(0, 24)}
              className={styles.paragraph}
              start="top 85%"
              end="bottom 55%"
            >
              {paragraph}
            </ScrubWords>
          ))}
          <a
            href="#contact"
            className={`${styles.cta} display`}
            onClick={(e) => {
              e.preventDefault();
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
                <Parallax amount={i === 0 ? 4 : 9}>
                  <Image
                    src={src}
                    alt={photo.caption}
                    sizes="(min-width: 900px) 28vw, 66vw"
                  />
                </Parallax>
                <TribalThorn className={styles.mark} />
                <span className={`${styles.caption} mono`}>
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

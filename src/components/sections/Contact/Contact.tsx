'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { HERO_SECTION_ID } from '@/constants/sections';
import { photos } from '@/data/images';
import { cx } from '@/lib/classNames';
import { scrollToTarget } from '@/lib/scroll';
import { getSectionNumber } from '@/lib/sections';
import TribalSun from '@/components/ornaments/TribalSun/TribalSun';
import ExternalLink from '@/components/ui/ExternalLink/ExternalLink';
import type { ContactProps } from '@/types/components/sections';
import { useContactAnimation } from './useContactAnimation';
import styles from './Contact.module.css';

const GOTHIC_TITLE_LINE = 1;

export default function Contact({ data, footer, name }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const photo = photos[data.photo.key];
  useContactAnimation(ref);

  return (
    <footer id="contact" ref={ref} className={styles.footer}>
      <div className={styles.top}>
        <p className={cx(styles.label, 'mono')}>
          <span className={styles.index}>{getSectionNumber('contact')}</span>
          <span className={cx(styles.word, 'gothic')}>{data.label}</span>
        </p>

        <TribalSun className={styles.sun} />
        <h2 id="contact-title" className={cx(styles.title, 'display')}>
          {data.title.map((line, i) => (
            <span
              key={line}
              className={
                i === GOTHIC_TITLE_LINE ? styles.gothicLine : undefined
              }
            >
              {line}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          <div className={styles.left}>
            <p className={styles.subtitle}>{data.subtitle}</p>
            {photo && (
              <figure className={styles.photo}>
                <Image
                  src={photo}
                  alt={data.photo.caption}
                  sizes="(min-width: 900px) 360px, 100vw"
                />
                <figcaption className={cx(styles.caption, 'mono')}>
                  {data.photo.caption}
                </figcaption>
              </figure>
            )}
          </div>
          <div className={styles.right}>
            <a href={`mailto:${data.email}`} className={styles.email}>
              {data.email}
            </a>
            <ul className={cx(styles.socials, 'mono')}>
              {data.socials.map((social) => (
                <li key={social.name}>
                  <ExternalLink href={social.url} className={styles.social}>
                    {social.name}
                    <span aria-hidden="true">↗</span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={cx(styles.meta, 'mono')}>
        <span>
          © {new Date().getFullYear()} {name.firstName} {name.lastName} —{' '}
          {footer.rights}
        </span>
        <a
          href={`#${HERO_SECTION_ID}`}
          className={styles['top-link']}
          onClick={(event) => {
            event.preventDefault();
            scrollToTarget(0, lenis);
          }}
        >
          {footer.backToTop} ↑
        </a>
      </div>

      <div className={cx(styles.band, 'band-red')} aria-hidden="true">
        <span className={cx(styles.giant, 'display')}>
          {name.firstName} {name.lastName}
        </span>
      </div>
    </footer>
  );
}

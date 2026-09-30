'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import { scrollToTarget } from '@/lib/scroll';
import { photos } from '@/data/images';
import type { ContactData, FooterData, HeroData } from '@/data/types';
import { TribalSun } from '@/components/motion/Ornament';
import styles from './Contact.module.css';

type Props = {
  data: ContactData;
  footer: FooterData;
  name: Pick<HeroData, 'firstName' | 'lastName'>;
};

export default function Contact({ data, footer, name }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const photo = photos[data.photo.key];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce } = ctx.conditions ?? {};
        if (reduce) return;

        const title = root.querySelector(`.${styles.title}`);
        gsap.fromTo(
          title,
          { scale: 0.86, yPercent: 12 },
          {
            scale: 1,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: title,
              start: 'top bottom',
              end: 'top 35%',
              scrub: true,
            },
          },
        );

        gsap.from(root.querySelectorAll(`.${styles.grid} > * > *`), {
          y: 24,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.7,
          scrollTrigger: {
            trigger: root.querySelector(`.${styles.grid}`),
            start: 'top 85%',
            once: true,
          },
        });

        gsap.fromTo(
          root.querySelector(`.${styles.giant}`),
          { yPercent: 40 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.querySelector(`.${styles.band}`),
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <footer id="contact" ref={ref} className={styles.footer}>
      <div className={styles.top}>
        <p className={`${styles.label} mono`}>
          <span className={styles.index}>05</span>
          <span className={`${styles.word} gothic`}>{data.label}</span>
        </p>

        <TribalSun className={styles.sun} />
        <h2 id="contact-title" className={`${styles.title} display`}>
          {data.title.map((line, i) => (
            <span key={line} className={i === 1 ? styles.gothicLine : undefined}>
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
                <figcaption className={`${styles.caption} mono`}>
                  {data.photo.caption}
                </figcaption>
              </figure>
            )}
          </div>
          <div className={styles.right}>
            <a href={`mailto:${data.email}`} className={styles.email}>
              {data.email}
            </a>
            <ul className={`${styles.socials} mono`}>
              {data.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
                  >
                    {social.name}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.meta} mono`}>
        <span>
          © {new Date().getFullYear()} {name.firstName} {name.lastName} —{' '}
          {footer.rights}
        </span>
        <span>{footer.builtWith}</span>
        <a
          href="#hero"
          className={styles['top-link']}
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0, lenis);
          }}
        >
          {footer.backToTop} ↑
        </a>
      </div>

      <div className={`${styles.band} band-red`} aria-hidden="true">
        <span className={`${styles.giant} display`}>
          {name.firstName} {name.lastName}
        </span>
      </div>
    </footer>
  );
}

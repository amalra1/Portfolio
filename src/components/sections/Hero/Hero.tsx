'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import { heroImage } from '@/data/images';
import type { HeroData } from '@/data/types';
import { TribalSun } from '@/components/motion/Ornament';
import styles from './Hero.module.css';

export default function Hero({ data }: { data: HeroData }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MEDIA, (ctx) => {
        const { reduce, mobile } = ctx.conditions ?? {};
        if (reduce) return;

        const lines = root.querySelectorAll<HTMLElement>(`.${styles.line}`);
        const figure = root.querySelector(`.${styles.figure}`);
        const sun = root.querySelector(`.${styles.sun}`);
        const meta = root.querySelectorAll(`.${styles.meta} > *`);
        const bottom = root.querySelectorAll(`.${styles.bottom} > *`);
        const cueLine = root.querySelector(`.${styles.cueLine}`);

        gsap.set([meta, bottom], { autoAlpha: 0 });
        gsap.set(figure, { clipPath: 'inset(100% 0 0 0)' });

        // ---- intro: name rises char by char, photo wipes up, labels fade in
        document.fonts.ready.then(() => {
          const split = SplitText.create(lines, {
            type: 'chars',
            charsClass: 'hero-char',
            aria: 'auto',
          });
          gsap
            .timeline({ defaults: { ease: 'power4.out' } })
            .from(split.chars, {
              yPercent: 115,
              duration: 1.1,
              stagger: { each: 0.035, from: 'start' },
            })
            .to(
              figure,
              {
                clipPath: 'inset(0% 0 0 0)',
                duration: 1.2,
                ease: 'expo.inOut',
              },
              '-=0.9',
            )
            .from(sun, { scale: 0.6, rotate: -40, duration: 1.4 }, '<')
            .to(meta, { autoAlpha: 1, stagger: 0.08, duration: 0.6 }, '-=0.6')
            .to(bottom, { autoAlpha: 1, stagger: 0.1, duration: 0.6 }, '<');
        });

        // ---- scroll cue pulse
        gsap.fromTo(
          cueLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
          },
        );

        // ---- scrub: name splits apart, photo drifts, sun rotates
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
          .to(lines[0], { xPercent: mobile ? -6 : -12, ease: 'none' }, 0)
          .to(lines[1], { xPercent: mobile ? 6 : 12, ease: 'none' }, 0)
          .to(figure, { yPercent: mobile ? -10 : -22, ease: 'none' }, 0)
          .to(sun, { rotate: 90, ease: 'none' }, 0)
          .to([meta, bottom], { autoAlpha: 0, ease: 'none', duration: 0.4 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="hero"
      ref={ref}
      className={`${styles.hero} band-red`}
      aria-label={data.fullName}
    >
      <TribalSun className={styles.sun} />

      <div className={`${styles.meta} mono`}>
        <span>
          <strong>{data.role}</strong>
        </span>
        <span>{data.location}</span>
        <span>{new Date().getFullYear()} — Portfolio</span>
      </div>

      <div className={styles.stage}>
        <h1 className={`${styles.name} display`}>
          <span className={`${styles.line} ${styles.first}`}>
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
          <span className={`${styles.line} ${styles.last}`}>
            {data.lastName}
          </span>
        </h1>
      </div>

      <div className={`${styles.bottom} mono`}>
        <span className={styles.cue}>
          <span className={styles.cueLine} aria-hidden="true" />
          {data.scrollCue}
        </span>
        <p className={styles.tagline}>{data.tagline}</p>
      </div>
    </section>
  );
}

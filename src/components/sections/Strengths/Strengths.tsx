'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import { badges } from '@/data/images';
import type { StrengthsData } from '@/data/types';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import { TribalThorn } from '@/components/motion/Ornament';
import styles from './Strengths.module.css';

export default function Strengths({ data }: { data: StrengthsData }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce } = ctx.conditions ?? {};
        if (reduce) return;
        const cells = root.querySelectorAll(`.${styles.cell}`);
        gsap.set(cells, { y: 60, autoAlpha: 0, rotate: -1.5 });
        ScrollTrigger.batch(cells, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              rotate: 0,
              autoAlpha: 1,
              stagger: 0.1,
              duration: 0.9,
              ease: 'power4.out',
              overwrite: true,
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section
      id="strengths"
      index="02"
      label={data.label}
      titleId="strengths-title"
    >
      <SectionTitle id="strengths-title">{data.title}</SectionTitle>

      <ul ref={ref} className={styles.grid}>
        {data.skills.map((skill, i) => (
          <li key={skill.title} className={styles.cell}>
            <div className={styles.top}>
              <span className={`${styles.index} display`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <TribalThorn className={styles.spike} />
            </div>
            <h3 className={`${styles.title} display`}>{skill.title}</h3>
            <p className={styles.description}>{skill.description}</p>
            {'badges' in skill && skill.badges && (
              <ul className={styles.badges}>
                {skill.badges.map((badge) => {
                  const src = badges[badge];
                  if (!src) return null;
                  return (
                    <li key={badge}>
                      <a
                        href={src.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.badge}
                        title={badge.replace(/-/g, ' ')}
                      >
                        <Image
                          src={src}
                          alt={badge.replace(/-/g, ' ')}
                          width={48}
                          height={48}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

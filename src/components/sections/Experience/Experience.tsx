'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import { logos } from '@/data/images';
import type { ExperienceData } from '@/data/types';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import SplitReveal from '@/components/motion/SplitReveal';
import styles from './Experience.module.css';

export default function Experience({ data }: { data: ExperienceData }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce } = ctx.conditions ?? {};
        if (reduce) return;
        gsap.fromTo(
          root.querySelector(`.${styles.progress}`),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        );
        const bodies = root.querySelectorAll(`.${styles.body}`);
        bodies.forEach((body) => {
          gsap.from(body.children, {
            y: 24,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.7,
            scrollTrigger: { trigger: body, start: 'top 85%', once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section
      id="experience"
      index="03"
      label={data.label}
      titleId="experience-title"
    >
      <SectionTitle id="experience-title">{data.title}</SectionTitle>

      <ol ref={ref} className={styles.list}>
        <span className={styles.progress} aria-hidden="true" />
        {data.items.map((item) => {
          const logo = logos[item.logo];
          return (
            <li key={item.company} className={styles.item}>
              <p className={`${styles.years} display`}>
                <SplitReveal type="chars" stagger={0.04}>
                  {item.start}
                </SplitReveal>
                <span className={styles.dash} aria-hidden="true">
                  —
                </span>
                <SplitReveal
                  type="chars"
                  stagger={0.04}
                  delay={0.15}
                  className={item.end ? undefined : styles.present}
                >
                  {item.end ?? data.present}
                </SplitReveal>
              </p>

              <div className={styles.body}>
                <h3 className={styles.company}>
                  {logo && (
                    <Image
                      src={logo}
                      alt=""
                      width={28}
                      height={28}
                      className={styles.logo}
                    />
                  )}
                  {item.company}
                </h3>
                <p className={`${styles.role} mono`}>
                  {item.role} · {item.startLabel} —{' '}
                  {item.endLabel ?? data.present}
                </p>
                <ul className={`${styles.tech} mono`}>
                  {item.tech.map((tech) => (
                    <li key={tech} className={styles.chip}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className={styles.description}>{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

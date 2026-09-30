'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { logos } from '@/data/images';
import { cx } from '@/lib/classNames';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import SplitReveal from '@/components/motion/SplitReveal/SplitReveal';
import type { ExperienceProps } from '@/types/components/sections';
import { useExperienceAnimation } from './useExperienceAnimation';
import styles from './Experience.module.css';

export default function Experience({ data }: ExperienceProps) {
  const ref = useRef<HTMLOListElement>(null);
  useExperienceAnimation(ref);

  return (
    <Section id="experience" label={data.label} titleId="experience-title">
      <SectionTitle id="experience-title">{data.title}</SectionTitle>

      <ol ref={ref} className={styles.list}>
        <span className={styles.progress} aria-hidden="true" />
        {data.items.map((item) => {
          const logo = logos[item.logo];
          return (
            <li key={item.company} className={styles.item}>
              <p className={cx(styles.years, 'display')}>
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
                <p className={cx(styles.role, 'mono')}>
                  {item.role} · {item.startLabel} —{' '}
                  {item.endLabel ?? data.present}
                </p>
                <ul className={cx(styles.tech, 'mono')}>
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

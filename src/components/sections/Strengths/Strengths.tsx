'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { badges } from '@/data/images';
import { cx } from '@/lib/classNames';
import { padIndex, slugToLabel } from '@/lib/format';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import TribalThorn from '@/components/ornaments/TribalThorn/TribalThorn';
import ExternalLink from '@/components/ui/ExternalLink/ExternalLink';
import type { StrengthsProps } from '@/types/components/sections';
import { useStrengthsAnimation } from './useStrengthsAnimation';
import styles from './Strengths.module.css';

export default function Strengths({ data }: StrengthsProps) {
  const ref = useRef<HTMLUListElement>(null);
  useStrengthsAnimation(ref);

  return (
    <Section id="strengths" label={data.label} titleId="strengths-title">
      <SectionTitle id="strengths-title">{data.title}</SectionTitle>

      <ul ref={ref} className={styles.grid}>
        {data.skills.map((skill, i) => (
          <li key={skill.title} className={styles.cell}>
            <div className={styles.top}>
              <span className={cx(styles.index, 'display')}>
                {padIndex(i + 1)}
              </span>
              <TribalThorn className={styles.spike} />
            </div>
            <h3 className={cx(styles.title, 'display')}>{skill.title}</h3>
            <p className={styles.description}>{skill.description}</p>
            {'badges' in skill && skill.badges && (
              <ul className={styles.badges}>
                {skill.badges.map((badge) => {
                  const src = badges[badge];
                  if (!src) return null;
                  const label = slugToLabel(badge);
                  return (
                    <li key={badge}>
                      <ExternalLink
                        href={src.src}
                        className={styles.badge}
                        title={label}
                      >
                        <Image src={src} alt={label} width={48} height={48} />
                      </ExternalLink>
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

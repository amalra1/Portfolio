'use client';

import { useRef } from 'react';
import { GLYPH_NAMES } from '@/constants/glyphs';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { StrengthsProps } from '@/types/components/sections';
import SkillFlash from './SkillFlash';
import { useStrengthsAnimation } from './useStrengthsAnimation';
import styles from './Strengths.module.css';

export default function Strengths({ data }: StrengthsProps) {
  const ref = useRef<HTMLDivElement>(null);
  useStrengthsAnimation(ref);

  return (
    <Section id="strengths" label={data.label} titleId="strengths-title">
      <SectionTitle id="strengths-title">{data.title}</SectionTitle>

      <div ref={ref} className={styles.sheet}>
        <ul className={styles.grid}>
          {data.skills.map((skill, i) => (
            <SkillFlash key={skill.title} skill={skill} index={i} />
          ))}
        </ul>

        <div className={styles.foot}>
          <span className={styles.legend} aria-hidden="true">
            {GLYPH_NAMES.map((name) => (
              <TribalGlyph
                key={name}
                name={name}
                className={styles.legendGlyph}
              />
            ))}
          </span>
        </div>
      </div>
    </Section>
  );
}

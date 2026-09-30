import { SKILL_GLYPHS } from '@/constants/glyphs';
import { cx } from '@/lib/classNames';
import { glyphAt } from '@/lib/glyphs';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { SkillFlashProps } from '@/types/components/sections';
import styles from './SkillFlash.module.css';

export default function SkillFlash({ skill, index }: SkillFlashProps) {
  return (
    <li className={styles.cell}>
      <span className={styles.stamp}>
        <TribalGlyph
          name={glyphAt(SKILL_GLYPHS, index)}
          className={styles.glyph}
        />
      </span>
      <h3 className={cx(styles.title, 'display')}>{skill.title}</h3>
      <p className={styles.description}>{skill.description}</p>
    </li>
  );
}

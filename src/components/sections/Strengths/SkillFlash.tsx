import Image from 'next/image';
import { SKILL_GLYPHS } from '@/constants/glyphs';
import { badges } from '@/data/images';
import { cx } from '@/lib/classNames';
import { slugToLabel } from '@/lib/format';
import { glyphAt } from '@/lib/glyphs';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import ExternalLink from '@/components/ui/ExternalLink/ExternalLink';
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
  );
}

import { cx } from '@/lib/classNames';
import { getSectionNumber } from '@/lib/sections';
import TribalSpikes from '@/components/ornaments/TribalSpikes/TribalSpikes';
import type { SectionProps } from '@/types/components/layout';
import styles from './Section.module.css';

export default function Section({
  id,
  label,
  titleId,
  children,
  className,
  padded = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cx(styles.section, className)}
    >
      <div className={padded ? styles.inner : undefined}>
        <p className={cx(styles.label, 'mono')}>
          <span className={styles.index}>{getSectionNumber(id)}</span>
          <span className={cx(styles.word, 'gothic')}>{label}</span>
          <TribalSpikes className={styles.spikes} />
        </p>
        {children}
      </div>
    </section>
  );
}

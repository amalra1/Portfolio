import type { ReactNode } from 'react';
import { TribalSpikes } from '@/components/motion/Ornament';
import styles from './Section.module.css';

type Props = {
  id: string;
  index: string;
  label: string;
  titleId: string;
  children: ReactNode;
  className?: string;
  /** Set false when the section renders its own full-bleed layout. */
  padded?: boolean;
};

export default function Section({
  id,
  index,
  label,
  titleId,
  children,
  className,
  padded = true,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`${styles.section} ${className ?? ''}`}
    >
      <div className={padded ? styles.inner : undefined}>
        <p className={`${styles.label} mono`}>
          <span className={styles.index}>{index}</span>
          <span className={`${styles.word} gothic`}>{label}</span>
          <TribalSpikes className={styles.spikes} />
        </p>
        {children}
      </div>
    </section>
  );
}

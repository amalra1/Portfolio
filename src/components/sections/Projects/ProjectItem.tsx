import Image from 'next/image';
import { projectImages } from '@/data/images';
import { PROJECT_GLYPHS } from '@/constants/glyphs';
import { cx } from '@/lib/classNames';
import { glyphAt } from '@/lib/glyphs';
import { padIndex } from '@/lib/format';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import ExternalLink from '@/components/ui/ExternalLink/ExternalLink';
import type { ProjectItemProps } from '@/types/components/sections';
import styles from './Projects.module.css';

export default function ProjectItem({
  project,
  index,
  categoryLabel,
  openLabel,
}: ProjectItemProps) {
  const image = projectImages[project.image];

  return (
    <li className={styles.item}>
      <ExternalLink
        href={project.url}
        className={styles.link}
        aria-label={`${project.title} — ${openLabel}`}
      >
        <span className={styles.figure}>
          <span className={cx(styles.index, 'display')} aria-hidden="true">
            {padIndex(index + 1)}
          </span>
          {image && (
            <Image
              src={image}
              alt=""
              sizes="(min-width: 900px) 55vw, 100vw"
              loading="lazy"
            />
          )}
        </span>

        <span className={styles.body}>
          <span className={styles.head}>
            <span className={cx(styles.title, 'display')}>{project.title}</span>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </span>
          <span className={cx(styles.meta, 'mono')}>
            <span className={cx(styles.tag, styles.tagCategory)}>
              {categoryLabel}
            </span>
            {project.tech.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </span>
          <span className={styles.description}>{project.description}</span>
          <TribalGlyph
            name={glyphAt(PROJECT_GLYPHS, index)}
            className={styles.glyph}
          />
        </span>
      </ExternalLink>
    </li>
  );
}

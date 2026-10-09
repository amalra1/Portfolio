import { useRef } from 'react';
import Image from 'next/image';
import { projectImages } from '@/data/images';
import { projectVideos } from '@/data/videos';
import { PROJECT_GLYPHS } from '@/constants/glyphs';
import { cx } from '@/lib/classNames';
import { glyphAt } from '@/lib/glyphs';
import { padIndex } from '@/lib/format';
import { useFitWords } from '@/hooks/useFitWords';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import ExternalLink from '@/components/ui/ExternalLink/ExternalLink';
import type { ProjectItemProps } from '@/types/components/sections';
import ProjectVideo from './ProjectVideo';
import styles from './Projects.module.css';

export default function ProjectItem({
  project,
  index,
  categoryLabel,
  openLabel,
}: ProjectItemProps) {
  const image = projectImages[project.image];
  const video = projectVideos[project.image];
  const itemRef = useRef<HTMLLIElement>(null);
  const titleRef = useFitWords<HTMLSpanElement>();

  const content = (
    <>
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
        {video && <ProjectVideo src={video} triggerRef={itemRef} />}
      </span>

      <span className={styles.body}>
        <span className={styles.head}>
          <span ref={titleRef} className={cx(styles.title, 'display')}>
            {project.title}
          </span>
          {project.url && (
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          )}
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
    </>
  );

  return (
    <li ref={itemRef} className={styles.item}>
      {project.url ? (
        <ExternalLink
          href={project.url}
          className={styles.link}
          aria-label={`${project.title} — ${openLabel}`}
        >
          {content}
        </ExternalLink>
      ) : (
        content
      )}
    </li>
  );
}

import Image from 'next/image';
import { projectImages } from '@/data/images';
import type { Project } from '@/data/types';
import { TribalThorn } from '@/components/motion/Ornament';
import styles from './Projects.module.css';

type Props = {
  project: Project;
  index: number;
  categoryLabel: string;
  openLabel: string;
};

export default function ProjectItem({
  project,
  index,
  categoryLabel,
  openLabel,
}: Props) {
  const image = projectImages[project.image];

  return (
    <li className={styles.item}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label={`${project.title} — ${openLabel}`}
      >
        <span className={styles.figure}>
          <span className={`${styles.index} display`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
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
            <span className={`${styles.title} display`}>{project.title}</span>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </span>
          <span className={`${styles.meta} mono`}>
            <span className={`${styles.tag} ${styles.tagCategory}`}>
              {categoryLabel}
            </span>
            {project.tech.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </span>
          <span className={styles.description}>{project.description}</span>
          <TribalThorn className={styles.thorn} />
        </span>
      </a>
    </li>
  );
}

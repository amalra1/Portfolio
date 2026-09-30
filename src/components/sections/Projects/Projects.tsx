'use client';

import { useMemo, useRef, useState } from 'react';
import {
  ALL_PROJECTS_CATEGORY,
  DEFAULT_PROJECT_CATEGORY,
  PROJECT_CATEGORY_ORDER,
} from '@/constants/projects';
import { cx } from '@/lib/classNames';
import { padIndex } from '@/lib/format';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import type { ProjectsProps } from '@/types/components/sections';
import type { ProjectCategory } from '@/types/portfolio';
import ProjectItem from './ProjectItem';
import { useProjectsAnimation } from './useProjectsAnimation';
import styles from './Projects.module.css';

export default function Projects({ data }: ProjectsProps) {
  const [category, setCategory] = useState<ProjectCategory>(
    DEFAULT_PROJECT_CATEGORY,
  );
  const listRef = useRef<HTMLUListElement>(null);
  useProjectsAnimation(listRef, category);

  const counts = useMemo(() => {
    const countByCategory = new Map<ProjectCategory, number>();
    countByCategory.set(ALL_PROJECTS_CATEGORY, data.list.length);
    data.list.forEach((project) => {
      const key = project.category as ProjectCategory;
      countByCategory.set(key, (countByCategory.get(key) ?? 0) + 1);
    });
    return countByCategory;
  }, [data.list]);

  const visible = useMemo(
    () =>
      category === ALL_PROJECTS_CATEGORY
        ? data.list
        : data.list.filter((project) => project.category === category),
    [data.list, category],
  );

  return (
    <Section id="projects" label={data.label} titleId="projects-title">
      <SectionTitle id="projects-title">{data.title}</SectionTitle>

      <div className={styles.toolbar}>
        <div className={styles.filter} role="group" aria-label={data.label}>
          {PROJECT_CATEGORY_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={cx(
                styles.chip,
                'mono',
                category === key && styles.chipActive,
              )}
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              <span>{data.categories[key]}</span>
              <span className={styles.chipCount}>{counts.get(key) ?? 0}</span>
            </button>
          ))}
        </div>
        <span className={cx(styles.count, 'display')} aria-live="polite">
          {padIndex(visible.length)}
          <small className="mono">/ {padIndex(data.list.length)}</small>
        </span>
      </div>

      <ul ref={listRef} className={styles.list}>
        {visible.map((project, i) => (
          <ProjectItem
            key={project.slug}
            project={project}
            index={i}
            categoryLabel={data.categories[project.category as ProjectCategory]}
            openLabel={data.openLabel}
          />
        ))}
      </ul>
    </Section>
  );
}

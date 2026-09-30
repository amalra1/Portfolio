'use client';

import { useMemo, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';
import type { ProjectCategory, ProjectsData } from '@/data/types';
import Section from '@/components/layout/Section/Section';
import SectionTitle from '@/components/layout/SectionTitle/SectionTitle';
import ProjectItem from './ProjectItem';
import styles from './Projects.module.css';

const CATEGORY_ORDER: ProjectCategory[] = [
  'webDev',
  'computerVision',
  'gameDev',
  'other',
  'all',
];

export default function Projects({ data }: { data: ProjectsData }) {
  const [category, setCategory] = useState<ProjectCategory>('webDev');
  const listRef = useRef<HTMLUListElement>(null);

  const counts = useMemo(() => {
    const map = new Map<ProjectCategory, number>();
    map.set('all', data.list.length);
    data.list.forEach((p) => {
      const key = p.category as ProjectCategory;
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return map;
  }, [data.list]);

  const visible = useMemo(
    () =>
      category === 'all'
        ? data.list
        : data.list.filter((p) => p.category === category),
    [data.list, category],
  );

  // Items animate in on first view and again whenever the filter changes.
  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce, desktop } = ctx.conditions ?? {};
        if (reduce) return;
        const items = list.querySelectorAll<HTMLElement>(`.${styles.item}`);
        items.forEach((item, i) => {
          const figure = item.querySelector(`.${styles.figure}`);
          const body = item.querySelector(`.${styles.body}`);
          const fromX = desktop ? (i % 2 === 0 ? -60 : 60) : 0;
          gsap.set(figure, { x: fromX, y: desktop ? 0 : 40, autoAlpha: 0 });
          gsap.set(body, { y: 30, autoAlpha: 0 });
        });
        ScrollTrigger.batch(items, {
          start: 'top 85%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((item) => {
              const el = item as HTMLElement;
              gsap
                .timeline()
                .to(el.querySelector(`.${styles.figure}`), {
                  x: 0,
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.9,
                  ease: 'power4.out',
                  overwrite: true,
                })
                .to(
                  el.querySelector(`.${styles.body}`),
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    overwrite: true,
                  },
                  '-=0.6',
                );
            });
          },
        });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    },
    { scope: listRef, dependencies: [category], revertOnUpdate: true },
  );

  return (
    <Section id="projects" index="04" label={data.label} titleId="projects-title">
      <SectionTitle id="projects-title">{data.title}</SectionTitle>

      <div className={styles.toolbar}>
        <div className={styles.filter} role="group" aria-label={data.label}>
          {CATEGORY_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.chip} mono ${
                category === key ? styles.chipActive : ''
              }`}
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              <span>{data.categories[key]}</span>
              <span className={styles.chipCount}>{counts.get(key) ?? 0}</span>
            </button>
          ))}
        </div>
        <span className={`${styles.count} display`} aria-live="polite">
          {String(visible.length).padStart(2, '0')}
          <small className="mono">/ {String(data.list.length).padStart(2, '0')}</small>
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

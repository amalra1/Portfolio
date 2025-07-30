'use client';

import React, { useState } from 'react';
import styles from './Projects.module.css';
import ProjectCard from '@/components/projectCard/ProjectCard';
import Button from '@mui/material/Button';

type Project = {
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
};

type ProjectsData = {
  title: string;
  subtitle: string;
  categories: { [key: string]: string };
  list: Project[];
};

type ProjectsProps = {
  data: ProjectsData;
};

export default function Projects({ data }: ProjectsProps) {
  const [activeCategoryKey, setActiveCategoryKey] = useState('computerVision');

  const activeCategoryText = data.categories[activeCategoryKey];

  const filteredProjects =
    activeCategoryKey === 'all'
      ? data.list
      : data.list.filter((p) => p.category === activeCategoryText);

  return (
    <div className={styles.projectsContent}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.subtitle}>{data.subtitle}</h2>

      <div className={styles.filterContainer}>
        {Object.keys(data.categories).map((categoryKey) => (
          <Button
            key={categoryKey}
            variant={
              activeCategoryKey === categoryKey ? 'contained' : 'outlined'
            }
            onClick={() => setActiveCategoryKey(categoryKey)}
            className={styles.filterButton}
          >
            {data.categories[categoryKey]}
          </Button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

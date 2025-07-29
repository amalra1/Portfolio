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
  list: Project[];
};

type ProjectsProps = {
  data: ProjectsData;
};

export default function Projects({ data }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('Computer Vision');

  const categories = [
    ...Array.from(new Set(data.list.map((p) => p.category))),
    'All',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? data.list
      : data.list.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.projectsContent}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.subtitle}>{data.subtitle}</h2>

      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory(category)}
            sx={{ borderRadius: '20px', textTransform: 'none' }}
          >
            {category}
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

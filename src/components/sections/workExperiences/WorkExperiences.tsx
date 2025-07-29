import React from 'react';
import styles from './WorkExperiences.module.css';
import ExperienceCard from '@/components/experienceCard/ExperienceCard';

type Experience = {
  logo: string;
  company: string;
  dateRange: string;
  description: string;
};

type WorkData = {
  title: string;
  subtitle: string;
  experiences: Experience[];
};

type WorkProps = {
  data: WorkData;
};

export default function WorkExperiences({ data }: WorkProps) {
  return (
    <div className={styles.workContent}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.subtitle}>{data.subtitle}</h2>
      <div className={styles.experiencesList}>
        {data.experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </div>
    </div>
  );
}

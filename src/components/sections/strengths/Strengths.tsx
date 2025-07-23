import React from 'react';
import styles from './Strengths.module.css';
import SkillCard from '@/components/skillCard/SkillCard';

type Skill = {
  icon: string;
  title: string;
  description: string;
};

type StrengthsData = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

type StrengthsProps = {
  data: StrengthsData;
};

export default function Strengths({ data }: StrengthsProps) {
  return (
    <div className={styles.strengthsContent}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.subtitle}>{data.subtitle}</h2>
      <div className={styles.skillsGrid}>
        {data.skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
}

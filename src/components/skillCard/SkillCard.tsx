import React from 'react';
import styles from './SkillCard.module.css';
import Icon from '@/components/icon/Icon';

type Skill = {
  icon: string;
  title: string;
  description: string;
};

type SkillCardProps = {
  skill: Skill;
};

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.iconWrapper}>
        <Icon name={skill.icon} className={styles.icon} />
      </div>
      <h3 className={styles.skillTitle}>{skill.title}</h3>
      <p className={styles.skillDescription}>{skill.description}</p>
    </div>
  );
}

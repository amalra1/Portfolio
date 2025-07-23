import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ExperienceCard.module.css';

import vivoLogo from '@/assets/logos/vivo-logo.png';
import ciandtLogo from '@/assets/logos/ciandt-logo.png';

const logoMap: { [key: string]: StaticImageData } = {
  vivo: vivoLogo,
  ciandt: ciandtLogo,
};

type Experience = {
  logo: string;
  company: string;
  dateRange: string;
  description: string;
};

type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const logoSrc = logoMap[experience.logo];

  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        {logoSrc && (
          <Image
            src={logoSrc}
            alt={`${experience.company} Logo`}
            className={styles.logo}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.company}>{experience.company}</h3>
        <p className={styles.dateRange}>{experience.dateRange}</p>
        <p className={styles.description}>{experience.description}</p>
      </div>
    </div>
  );
}

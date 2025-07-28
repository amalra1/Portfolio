import React from 'react';
import styles from './About.module.css';
import Button from '@/components/button/Button';

type AboutData = {
  title: string;
  subtitle: string;
  description: string[];
};

type AboutProps = {
  data: AboutData;
};

export default function About({ data }: AboutProps) {
  return (
    <div className={styles.aboutContent}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.subtitle}>{data.subtitle}</h2>

      <div className={styles.descriptionContainer}>
        {data.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* <Button text="Download Resume" href="" /> */}
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import Button from '@/components/button/Button';
import profileImage from '@/assets/images/foto-mais-profissional.jpeg';

type HeroData = {
  name: string;
  title: string;
  description: string;
};

type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  return (
    <div className={styles.heroContent}>
      <Image
        src={profileImage}
        alt={`Foto de ${data.name}`}
        width={150}
        height={150}
        className={styles.profileImage}
      />
      <h1 className={styles.name}>{data.name}</h1>
      <h2 className={styles.title}>{data.title}</h2>

      <p className={styles.description}>{data.description}</p>

      <Button text="Contact Me" href="" />
    </div>
  );
}

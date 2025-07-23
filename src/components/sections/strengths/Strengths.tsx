'use client';

import React, { useState } from 'react';
import { StaticImageData } from 'next/image';
import styles from './Strengths.module.css';
import SkillCard from '@/components/skillCard/SkillCard';
import ImageModal from '@/components/imageModal/ImageModal';

type Skill = {
  icon: string;
  title: string;
  description: string;
  badges?: string[];
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
  const [modalImage, setModalImage] = useState<StaticImageData | null>(null);

  const handleOpenModal = (imageSrc: StaticImageData) => {
    setModalImage(imageSrc);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div className={styles.strengthsContent}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.subtitle}>{data.subtitle}</h2>
      <div className={styles.skillsGrid}>
        {data.skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} onBadgeClick={handleOpenModal} />
        ))}
      </div>

      {/* 3. Renderize o componente do modal */}
      <ImageModal
        isOpen={!!modalImage}
        imageSrc={modalImage}
        onClose={handleCloseModal}
      />
    </div>
  );
}

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './SkillCard.module.css';
import Icon from '@/components/icon/Icon';

import awsCloudPractitioner from '@/assets/badges/aws-cloud-quest-cloud-practitioner.png';
//import awsGenAI from '@/assets/badges/aws-cloud-quest-generative-ai-practitioner.png';
import awsKnowledge from '@/assets/badges/aws-knowledge-cloud-essentials.png';
import awsPartner from '@/assets/badges/aws-partner-generative-ai-essentials.png';
import awsGenAIArchitect from '@/assets/badges/aws-cloud-quest-generative-ai-architect.png';

const badgeMap: { [key: string]: StaticImageData } = {
  'aws-cloud-quest-cloud-practitioner': awsCloudPractitioner,
  //'aws-cloud-quest-generative-ai-practitioner': awsGenAI,
  'aws-knowledge-cloud-essentials': awsKnowledge,
  'aws-partner-generative-ai-essentials': awsPartner,
  'aws-cloud-quest-generative-ai-architect': awsGenAIArchitect,
};

type Skill = {
  icon: string;
  title: string;
  description: string;
  badges?: string[];
};

type SkillCardProps = {
  skill: Skill;
  onBadgeClick: (imageSrc: StaticImageData) => void;
};

export default function SkillCard({ skill, onBadgeClick }: SkillCardProps) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.iconContainer}>
        <div className={styles.iconWrapper}>
          <Icon name={skill.icon} className={styles.icon} />
        </div>

        {skill.badges && (
          <div className={styles.badgesWrapper}>
            {skill.badges.map((badgeKey, index) => {
              const badgeSrc = badgeMap[badgeKey];
              if (!badgeSrc) return null;

              return (
                <div
                  key={index}
                  onClick={() => onBadgeClick(badgeSrc)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={badgeSrc}
                    alt={`Badge ${badgeKey}`}
                    width={50}
                    quality={100}
                    className={styles.badgeImage}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <h3 className={styles.skillTitle}>{skill.title}</h3>
      <p className={styles.skillDescription}>{skill.description}</p>
    </div>
  );
}

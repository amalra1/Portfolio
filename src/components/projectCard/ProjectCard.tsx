import React from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import styles from './ProjectCard.module.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import polygonImg from '@/assets/projects/polygon-generator.png';
import bodybuildingImg from '@/assets/projects/bodybuilding-pose-classifier.png';
import imageTextureSegmentationImg from '@/assets/projects/image-texture-segmentation.png';
import perspectiveTransformationImg from '@/assets/projects/perspective-transformation.png';
import zanagotchiImg from '@/assets/projects/zanagotchi.png';
import blocksImg from '@/assets/projects/blocks.png';
import fakeNewsImg from '@/assets/projects/fake-news-game.png';
import graphsImg from '@/assets/projects/graphs-processing-library.png';
import gameOfLifeImg from '@/assets/projects/game-of-life.png';
import reduxVImg from '@/assets/projects/redux-v.png';
import fodaSeImg from '@/assets/projects/foda-se.png';
import portfolioImg from '@/assets/projects/portfolio.png';
import secretSantaImg from '@/assets/projects/secret-santa.png';

const imageMap: { [key: string]: StaticImageData } = {
  'polygon-generator': polygonImg,
  'bodybuilding-pose-classifier': bodybuildingImg,
  'image-texture-segmentation': imageTextureSegmentationImg,
  'perspective-transformation': perspectiveTransformationImg,
  zanagotchi: zanagotchiImg,
  blocks: blocksImg,
  'fake-news-game': fakeNewsImg,
  'graphs-processing-library': graphsImg,
  'game-of-life': gameOfLifeImg,
  'redux-v': reduxVImg,
  'foda-se': fodaSeImg,
  portfolio: portfolioImg,
  'secret-santa': secretSantaImg,
};

type Project = {
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectImage = imageMap[project.image];

  return (
    <Card sx={{ maxWidth: 345, borderRadius: '12px' }} className={styles.card}>
      <Link href={project.url}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={projectImage.src}
            alt={project.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

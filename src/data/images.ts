import type { StaticImageData } from 'next/image';

import pedroSideCutout from '@/assets/images/pedro-side-cutout.webp';
import pedroSideInk from '@/assets/images/pedro-side-ink.webp';
import meCamera from '@/assets/images/me-camera.webp';
import meBike from '@/assets/images/me-bike.webp';
import meAirsoft from '@/assets/images/me-airsoft.webp';
import meTrail from '@/assets/images/me-trail.webp';

import ciandtLogo from '@/assets/logos/ciandt-logo.webp';
import vivoLogo from '@/assets/logos/vivo-logo.webp';

import badgeCloudPractitioner from '@/assets/badges/aws-cloud-quest-cloud-practitioner.webp';
import badgeGenAiPractitioner from '@/assets/badges/aws-cloud-quest-generative-ai-practitioner.webp';
import badgeCloudEssentials from '@/assets/badges/aws-knowledge-cloud-essentials.webp';
import badgeGenAiEssentials from '@/assets/badges/aws-partner-generative-ai-essentials.webp';
import badgeGenAiArchitect from '@/assets/badges/aws-cloud-quest-generative-ai-architect.webp';

import blocks from '@/assets/projects/blocks.webp';
import bodybuilding from '@/assets/projects/bodybuilding-pose-classifier.webp';
import fakeNews from '@/assets/projects/fake-news-game.webp';
import fodaSe from '@/assets/projects/foda-se.webp';
import gameOfLife from '@/assets/projects/game-of-life.webp';
import graphs from '@/assets/projects/graphs-processing-library.webp';
import textureSegmentation from '@/assets/projects/image-texture-segmentation.webp';
import perspective from '@/assets/projects/perspective-transformation.webp';
import polygon from '@/assets/projects/polygon-generator.webp';
import portfolio from '@/assets/projects/portfolio.webp';
import reduxV from '@/assets/projects/redux-v.webp';
import secretSanta from '@/assets/projects/secret-santa.webp';
import zanagotchi from '@/assets/projects/zanagotchi.webp';

export const heroImage = pedroSideCutout;
export const heroInk = pedroSideInk;

export const photos: Record<string, StaticImageData> = {
  camera: meCamera,
  bike: meBike,
  airsoft: meAirsoft,
  trail: meTrail,
};

export const logos: Record<string, StaticImageData> = {
  ciandt: ciandtLogo,
  vivo: vivoLogo,
};

export const badges: Record<string, StaticImageData> = {
  'aws-cloud-quest-cloud-practitioner': badgeCloudPractitioner,
  'aws-cloud-quest-generative-ai-practitioner': badgeGenAiPractitioner,
  'aws-knowledge-cloud-essentials': badgeCloudEssentials,
  'aws-partner-generative-ai-essentials': badgeGenAiEssentials,
  'aws-cloud-quest-generative-ai-architect': badgeGenAiArchitect,
};

export const projectImages: Record<string, StaticImageData> = {
  blocks,
  'bodybuilding-pose-classifier': bodybuilding,
  'fake-news-game': fakeNews,
  'foda-se': fodaSe,
  'game-of-life': gameOfLife,
  'graphs-processing-library': graphs,
  'image-texture-segmentation': textureSegmentation,
  'perspective-transformation': perspective,
  'polygon-generator': polygon,
  portfolio,
  'redux-v': reduxV,
  'secret-santa': secretSanta,
  zanagotchi,
};

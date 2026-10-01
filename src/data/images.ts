import type { StaticImageData } from 'next/image';

import pedroSideCutout from '@/assets/images/pedro-side-cutout.webp';
import pedroSideInk from '@/assets/images/pedro-side-ink.webp';
import meCamera from '@/assets/images/me-camera.webp';
import meBike from '@/assets/images/me-bike.webp';
import meAirsoft from '@/assets/images/me-airsoft.webp';
import meTrail from '@/assets/images/me-trail.webp';

import ciandtLogo from '@/assets/logos/ciandt-logo.svg';
import vivoLogo from '@/assets/logos/vivo-logo.svg';
import umonctonLogo from '@/assets/logos/umoncton-logo.svg';

import blocks from '@/assets/projects/blocks.webp';
import bodybuilding from '@/assets/projects/bodybuilding-pose-classifier.webp';
import connectchem from '@/assets/projects/connectchem.webp';
import textureSegmentation from '@/assets/projects/image-texture-segmentation.webp';
import ods from '@/assets/projects/ods.webp';
import perspective from '@/assets/projects/perspective-transformation.webp';
import portfolio from '@/assets/projects/portfolio.webp';
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
  umoncton: umonctonLogo,
};

export const projectImages: Record<string, StaticImageData> = {
  blocks,
  'bodybuilding-pose-classifier': bodybuilding,
  connectchem,
  'image-texture-segmentation': textureSegmentation,
  ods,
  'perspective-transformation': perspective,
  portfolio,
  'secret-santa': secretSanta,
  zanagotchi,
};

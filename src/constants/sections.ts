export const HERO_SECTION_ID = 'hero';

export const NAV_SECTION_IDS = [
  'about',
  'strengths',
  'experience',
  'projects',
  'contact',
] as const;

export const SECTION_IDS = [HERO_SECTION_ID, ...NAV_SECTION_IDS] as const;

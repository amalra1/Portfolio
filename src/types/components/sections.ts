import type {
  AboutData,
  ContactData,
  ExperienceData,
  FooterData,
  HeroData,
  InterludeData,
  PersonName,
  Project,
  ProjectsData,
  Skill,
  StrengthsData,
} from '@/types/portfolio';

export interface HeroProps {
  data: HeroData;
}

export interface AboutProps {
  data: AboutData;
}

export interface StrengthsProps {
  data: StrengthsData;
}

export interface SkillFlashProps {
  skill: Skill;
  index: number;
}

export interface InterludeProps {
  data: InterludeData;
}

export interface ExperienceProps {
  data: ExperienceData;
}

export interface ProjectsProps {
  data: ProjectsData;
}

export interface ProjectItemProps {
  project: Project;
  index: number;
  categoryLabel: string;
  openLabel: string;
}

export interface ContactProps {
  data: ContactData;
  footer: FooterData;
  name: PersonName;
}

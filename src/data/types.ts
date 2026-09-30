import en from './en.json';

export type PortfolioData = typeof en;
export type HeroData = PortfolioData['hero'];
export type NavigationData = PortfolioData['navigation'];
export type AboutData = PortfolioData['about'];
export type StrengthsData = PortfolioData['strengths'];
export type ExperienceData = PortfolioData['experience'];
export type ProjectsData = PortfolioData['projects'];
export type Project = ProjectsData['list'][number];
export type ProjectCategory = keyof ProjectsData['categories'];
export type ContactData = PortfolioData['contact'];
export type FooterData = PortfolioData['footer'];

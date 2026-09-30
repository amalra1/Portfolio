import enData from '@/data/en.json';
import ptBRData from '@/data/pt-BR.json';
import type { Language } from '@/types/language';
import type { PortfolioData } from '@/types/portfolio';

export const content: Record<Language, PortfolioData> = {
  en: enData,
  'pt-BR': ptBRData as PortfolioData,
};

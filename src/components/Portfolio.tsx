'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ScrollTrigger } from '@/lib/gsap';
import enData from '@/data/en.json';
import ptBRData from '@/data/pt-BR.json';
import type { PortfolioData } from '@/data/types';
import Header from '@/components/layout/Header/Header';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Strengths from '@/components/sections/Strengths/Strengths';
import Interlude from '@/components/sections/Interlude/Interlude';
import Experience from '@/components/sections/Experience/Experience';
import Projects from '@/components/sections/Projects/Projects';
import Contact from '@/components/sections/Contact/Contact';

export const SECTION_IDS = [
  'hero',
  'about',
  'strengths',
  'experience',
  'projects',
  'contact',
] as const;

// Typing pt-BR against the EN shape keeps both files structurally in sync.
const data: Record<'en' | 'pt-BR', PortfolioData> = {
  en: enData,
  'pt-BR': ptBRData as PortfolioData,
};

export default function Portfolio() {
  const { language } = useLanguage();
  const content = data[language];
  const activeSection = useActiveSection(SECTION_IDS);

  // Text lengths change with the language, so trigger positions must move.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [language]);

  return (
    <>
      <a href="#main" className="skip-link mono">
        {content.navigation.skipToContent}
      </a>
      <Header navigation={content.navigation} activeSection={activeSection} />
      <main id="main" key={language}>
        <Hero data={content.hero} />
        <About data={content.about} />
        <Strengths data={content.strengths} />
        <Interlude data={content.interlude} />
        <Experience data={content.experience} />
        <Projects data={content.projects} />
        <Contact
          data={content.contact}
          footer={content.footer}
          name={content.hero}
        />
      </main>
    </>
  );
}

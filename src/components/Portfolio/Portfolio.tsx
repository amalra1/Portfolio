'use client';

import { useEffect } from 'react';
import { SECTION_IDS } from '@/constants/sections';
import { content } from '@/data/content';
import { ScrollTrigger } from '@/lib/gsap';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header/Header';
import Preloader from '@/components/layout/Preloader/Preloader';
import About from '@/components/sections/About/About';
import Contact from '@/components/sections/Contact/Contact';
import Experience from '@/components/sections/Experience/Experience';
import Hero from '@/components/sections/Hero/Hero';
import Interlude from '@/components/sections/Interlude/Interlude';
import Projects from '@/components/sections/Projects/Projects';
import Strengths from '@/components/sections/Strengths/Strengths';

export default function Portfolio() {
  const { language } = useLanguage();
  const data = content[language];
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [language]);

  return (
    <>
      <a href="#main" className="skip-link mono">
        {data.navigation.skipToContent}
      </a>
      <Preloader />
      <Header navigation={data.navigation} activeSection={activeSection} />
      <main id="main" key={language}>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Strengths data={data.strengths} />
        <Interlude data={data.interlude} />
        <Experience data={data.experience} />
        <Projects data={data.projects} />
        <Contact data={data.contact} footer={data.footer} name={data.hero} />
      </main>
    </>
  );
}

'use client';

import { useRef } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import Header from '@/components/header/Header';
import Hero from '@/components/sections/hero/Hero';
import About from '@/components/sections/about/About';
import Strengths from '@/components/sections/strengths/Strengths';
import WorkExperiences from '@/components/sections/workExperiences/WorkExperiences';
import Projects from '@/components/sections/projects/Projects';
import portfolioData from '../data/Portfolio.json';
import styles from './page.module.css';

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  useSmoothScroll(mainRef);

  const activeSection = useActiveSection([
    'hero',
    'about',
    'strengths',
    'workExperiences',
    'projects',
  ]);

  return (
    <>
      <Header activeSection={activeSection} />

      <main ref={mainRef} className={styles.main}>
        <section id="hero" className={styles.section}>
          <Hero data={portfolioData.hero} />
        </section>

        <section id="about" className={styles.section}>
          <About data={portfolioData.about} />
        </section>

        <section id="strengths" className={styles.section}>
          <Strengths data={portfolioData.strengths} />
        </section>

        <section id="workExperiences" className={styles.section}>
          <WorkExperiences data={portfolioData.workExperiences} />
        </section>

        <section id="projects" className={styles.section}>
          <Projects data={portfolioData.projects} />
        </section>
      </main>
    </>
  );
}

'use client';

import { useActiveSection } from '@/hooks/useActiveSection';
import { useWindowSize } from '@/hooks/useWindowSize';
import Header from '@/components/header/Header';
import Hero from '@/components/sections/hero/Hero';
import About from '@/components/sections/about/About';
import Strengths from '@/components/sections/strengths/Strengths';
import WorkExperiences from '@/components/sections/workExperiences/WorkExperiences';
import Projects from '@/components/sections/projects/Projects';
import Contact from '@/components/sections/contact/Contact';
import portfolioData from '../data/Portfolio.json';
import styles from './page.module.css';

const MOBILE_BREAKPOINT = 900;

export default function HomePage() {
  const { width } = useWindowSize();
  const sectionIds = [
    'hero',
    'about',
    'strengths',
    'workExperiences',
    'projects',
    'contact',
  ];

  const sectionIdsToObserve = width > MOBILE_BREAKPOINT ? sectionIds : [];

  const activeSection = useActiveSection(sectionIdsToObserve);

  return (
    <>
      <Header activeSection={activeSection} />

      <main className={styles.main}>
        <section id="hero" className={styles.heroSection}>
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

        <section
          id="projects"
          className={`${styles.section} ${styles.sectionOverflow}`}
        >
          <Projects data={portfolioData.projects} />
        </section>

        <section
          id="contact"
          className={`${styles.section} ${styles.sectionFooter}`}
        >
          <Contact data={portfolioData.contact} />
        </section>
      </main>
    </>
  );
}

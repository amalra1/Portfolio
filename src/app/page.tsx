'use client';

import { useRef } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import Header from '@/components/header/Header';
import Hero from '@/components/sections/hero/Hero';
import About from '@/components/sections/about/About';
import Strengths from '@/components/sections/strengths/Strengths';
import portfolioData from '../data/Portfolio.json';
import styles from './page.module.css';

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  useSmoothScroll(mainRef);

  const activeSection = useActiveSection([
    'hero',
    'about',
    'strengths',
    'workexperiences',
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

        <section id="workexperiences" className={styles.section}>
          <div className={styles.content}>
            <h1>Where I&apos;ve been</h1>
            <p>Work experiences</p>
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <div className={styles.content}>
            <h1>What I&apos;ve done</h1>
            <p>Some of my work</p>
          </div>
        </section>
      </main>
    </>
  );
}

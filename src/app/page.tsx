'use client';

import { useRef } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import Header from '@/components/header/Header';
import Hero from '@/components/sections/hero/Hero';
import About from '@/components/sections/about/About';
import portfolioData from '../data/Portfolio.json';
import styles from './page.module.css';

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  useSmoothScroll(mainRef);

  return (
    <>
      <Header />
      <main ref={mainRef} className={styles.main}>
        <section id="hero" className={styles.section}>
          <Hero data={portfolioData.hero} />
        </section>

        <section id="about" className={styles.section}>
          <About data={portfolioData.about} />
        </section>

        <section id="projects" className={styles.section}>
          <div className={styles.content}>
            <h1>Projects</h1>
            <p>description</p>
          </div>
        </section>
      </main>
    </>
  );
}

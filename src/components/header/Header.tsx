import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
//import NightsStayIcon from '@mui/icons-material/NightsStay';

type HeaderProps = {
  activeSection: string;
};

export default function Header({ activeSection }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="#hero">👹</Link>
      </div>

      <nav className={styles.nav}>
        <Link
          href="#hero"
          className={`${styles.navLink} ${activeSection === 'hero' ? styles.activeLink : ''}`}
        >
          Home
        </Link>
        <Link
          href="#about"
          className={`${styles.navLink} ${activeSection === 'about' ? styles.activeLink : ''}`}
        >
          About
        </Link>
        <Link
          href="#strengths"
          className={`${styles.navLink} ${activeSection === 'strengths' ? styles.activeLink : ''}`}
        >
          Strengths
        </Link>
        <Link
          href="#workExperiences"
          className={`${styles.navLink} ${activeSection === 'workExperiences' ? styles.activeLink : ''}`}
        >
          Work Experiences
        </Link>
        <Link
          href="#projects"
          className={`${styles.navLink} ${activeSection === 'projects' ? styles.activeLink : ''}`}
        >
          Projects
        </Link>
      </nav>

      <div className={styles.actions}>
        <Link href="#contact" className={styles.contactLink}>
          Contact
        </Link>
        {/* <NightsStayIcon className={styles.themeToggle} /> */}
      </div>
    </header>
  );
}

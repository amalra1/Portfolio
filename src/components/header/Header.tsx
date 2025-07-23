import React from 'react';
import Link from 'next/link';
import Button from '@/components/button/Button';
import styles from './Header.module.css';
import NightsStayIcon from '@mui/icons-material/NightsStay';

type HeaderProps = {
  activeSection: string;
};

export default function Header({ activeSection }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="#hero">💀</Link>
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
          href="#workexperiences"
          className={`${styles.navLink} ${activeSection === 'workexperiences' ? styles.activeLink : ''}`}
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
        <Button text="Contact" href="#contact" />
        <NightsStayIcon className={styles.themeToggle} />
      </div>
    </header>
  );
}

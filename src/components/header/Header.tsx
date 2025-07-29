'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

type HeaderProps = {
  activeSection: string;
};

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="#hero" onClick={handleLinkClick}>
          👹
        </Link>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link
          href="#hero"
          className={`${styles.navLink} ${activeSection === 'hero' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          Home
        </Link>
        <Link
          href="#about"
          className={`${styles.navLink} ${activeSection === 'about' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          About
        </Link>
        <Link
          href="#strengths"
          className={`${styles.navLink} ${activeSection === 'strengths' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          Strengths
        </Link>
        <Link
          href="#workExperiences"
          className={`${styles.navLink} ${activeSection === 'workExperiences' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          Work Experiences
        </Link>
        <Link
          href="#projects"
          className={`${styles.navLink} ${activeSection === 'projects' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          Projects
        </Link>

        <Link
          href="#contact"
          className={styles.contactLinkMobile}
          onClick={handleLinkClick}
        >
          Contact
        </Link>
      </nav>

      <div className={styles.actions}>
        <Link href="#contact" className={styles.contactLinkDesktop}>
          Contact
        </Link>
        <button
          className={styles.hamburgerButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageSwitch from '../switch/Switch';

type NavigationText = {
  home: string;
  about: string;
  strengths: string;
  workExperiences: string;
  projects: string;
  contact: string;
};

type HeaderProps = {
  activeSection: string;
  navigation: NavigationText;
};

export default function Header({ activeSection, navigation }: HeaderProps) {
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
          {navigation.home}
        </Link>
        <Link
          href="#about"
          className={`${styles.navLink} ${activeSection === 'about' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          {navigation.about}
        </Link>
        <Link
          href="#strengths"
          className={`${styles.navLink} ${activeSection === 'strengths' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          {navigation.strengths}
        </Link>
        <Link
          href="#workExperiences"
          className={`${styles.navLink} ${activeSection === 'workExperiences' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          {navigation.workExperiences}
        </Link>
        <Link
          href="#projects"
          className={`${styles.navLink} ${activeSection === 'projects' ? styles.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          {navigation.projects}
        </Link>

        <Link
          href="#contact"
          className={styles.contactLinkMobile}
          onClick={handleLinkClick}
        >
          {navigation.contact}
        </Link>

        <div className={styles.languageSwitchMobile}>
          <LanguageSwitch />
        </div>
      </nav>

      <div className={styles.actions}>
        <Link href="#contact" className={styles.contactLinkDesktop}>
          {navigation.contact}
        </Link>
        <div className={styles.languageSwitchDesktop}>
          <LanguageSwitch />
        </div>
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

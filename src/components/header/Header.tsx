import React from 'react';
import Link from 'next/link';
import Button from '@/components/button/Button';
import styles from './Header.module.css';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">💀</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="#home" className={`${styles.navLink} ${styles.activeLink}`}>
          Home
        </Link>
        <Link href="#about" className={styles.navLink}>
          About
        </Link>
        <Link href="#projects" className={styles.navLink}>
          Projects
        </Link>
        <Link href="#strengths" className={styles.navLink}>
          Strengths
        </Link>
        <Link href="#work-experiences" className={styles.navLink}>
          Work Experiences
        </Link>
      </nav>

      <div className={styles.actions}>
        <Button text="Contact" href="" />
        <DarkModeOutlinedIcon className="themeToggle" />
      </div>
    </header>
  );
}

'use client';

import { useCallback, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { HERO_SECTION_ID } from '@/constants/sections';
import { cx } from '@/lib/classNames';
import { scrollToTarget } from '@/lib/scroll';
import { useHeaderScrolled } from '@/hooks/useHeaderScrolled';
import LangToggle from '@/components/layout/LangToggle/LangToggle';
import MobileMenu from '@/components/layout/MobileMenu/MobileMenu';
import NavList from '@/components/layout/NavList/NavList';
import TribalSun from '@/components/ornaments/TribalSun/TribalSun';
import type {
  HeaderProps,
  SectionNavigateHandler,
} from '@/types/components/layout';
import styles from './Header.module.css';
import { useHeaderAnimation } from './useHeaderAnimation';

export default function Header({ navigation, activeSection }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();
  const scrolled = useHeaderScrolled();
  useHeaderAnimation(brandRef);

  const closeMenu = useCallback(() => setOpen(false), []);

  const goTo: SectionNavigateHandler = (event, id) => {
    event.preventDefault();
    setOpen(false);
    scrollToTarget(`#${id}`, lenis, id === HERO_SECTION_ID ? 0 : -1);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <header
        className={cx(
          styles.header,
          scrolled && styles.scrolled,
          open && styles.menuOpen,
        )}
      >
        <a
          ref={brandRef}
          href={`#${HERO_SECTION_ID}`}
          className={styles.brand}
          onClick={(event) => goTo(event, HERO_SECTION_ID)}
          aria-label="Pedro Chapelin"
        >
          <TribalSun className={styles.sun} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <NavList
            navigation={navigation}
            onNavigate={goTo}
            activeSection={activeSection}
            classNames={{
              list: styles.list,
              link: cx(styles.link, 'mono'),
              active: styles.active,
              number: styles.num,
            }}
          />
        </nav>

        <div className={styles.right}>
          <span className={styles.toggle}>
            <LangToggle label={navigation.language} />
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            className={cx(styles.menuButton, 'mono')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            {open ? navigation.close : navigation.menu}
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        navigation={navigation}
        onNavigate={goTo}
        onClose={closeMenu}
        returnFocusRef={menuButtonRef}
      />
    </>
  );
}

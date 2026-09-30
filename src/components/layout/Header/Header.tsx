'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLenis } from 'lenis/react';
import { gsap, useGSAP } from '@/lib/gsap';
import { scrollToTarget } from '@/lib/scroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { NavigationData } from '@/data/types';
import LangToggle from '@/components/layout/LangToggle/LangToggle';
import styles from './Header.module.css';

type Props = {
  navigation: NavigationData;
  activeSection: string;
};

const NAV_ITEMS = [
  'about',
  'strengths',
  'experience',
  'projects',
  'contact',
] as const;

export default function Header({ navigation, activeSection }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    scrollToTarget(`#${id}`, lenis, id === 'hero' ? 0 : -1);
    history.replaceState(null, '', `#${id}`);
  };

  // Switch to the dark variant once the red hero has scrolled away.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const hero = document.getElementById('hero');
      const limit = hero ? hero.getBoundingClientRect().bottom : 0;
      setScrolled(limit <= 56);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock scroll and handle Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const menuButton = menuButtonRef.current;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    overlayRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      menuButton?.focus();
    };
  }, [open, lenis]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const links = overlay.querySelectorAll(`.${styles.overlayLink}`);
      if (reduced) {
        gsap.set(overlay, {
          clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          visibility: open ? 'visible' : 'hidden',
        });
        return;
      }
      if (open) {
        gsap
          .timeline()
          .set(overlay, { visibility: 'visible' })
          .to(overlay, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.7,
            ease: 'expo.inOut',
          })
          .from(
            links,
            {
              yPercent: 110,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power4.out',
            },
            '-=0.3',
          );
      } else {
        gsap.to(overlay, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'expo.inOut',
          onComplete: () => gsap.set(overlay, { visibility: 'hidden' }),
        });
      }
    },
    { dependencies: [open, reduced] },
  );

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${
          open ? styles.menuOpen : ''
        }`}
      >
        <a
          href="#hero"
          className={styles.brand}
          onClick={(e) => goTo(e, 'hero')}
          aria-label="Pedro Chapelin"
        >
          Pedro
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.list}>
            {NAV_ITEMS.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => goTo(e, id)}
                  className={`${styles.link} mono ${
                    activeSection === id ? styles.active : ''
                  }`}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  <span className={styles.num}>0{i + 1}</span>
                  <span>{navigation[id]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <span className={styles.toggle}>
            <LangToggle label={navigation.language} />
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.menuButton} mono`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? navigation.close : navigation.menu}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className={`${styles.overlay} band-red`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className={`${styles.overlayList} display`}>
            {NAV_ITEMS.map((id, i) => (
              <li key={id} className={styles.overlayItem}>
                <a
                  href={`#${id}`}
                  className={styles.overlayLink}
                  onClick={(e) => goTo(e, id)}
                  tabIndex={open ? 0 : -1}
                >
                  <span className={styles.num}>0{i + 1}</span>
                  <span>{navigation[id]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${styles.overlayFooter} mono`}>
          <span>Pedro Chapelin</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </>
  );
}

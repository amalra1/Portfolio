'use client';

import { useEffect, useState } from 'react';
import { HEADER_SCROLL_OFFSET } from '@/constants/layout';
import { HERO_SECTION_ID } from '@/constants/sections';

export function useHeaderScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const hero = document.getElementById(HERO_SECTION_ID);
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setScrolled(heroBottom <= HEADER_SCROLL_OFFSET);
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

  return scrolled;
}

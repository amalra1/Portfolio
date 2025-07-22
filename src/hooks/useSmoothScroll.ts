'use client';

import { useEffect, useRef } from 'react';

export function useSmoothScroll(mainRef: React.RefObject<HTMLElement | null>) {
  const isScrolling = useRef(false);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;

      isScrolling.current = true;

      const sections = mainEl.querySelectorAll('section');
      const currentScrollTop = mainEl.scrollTop;

      let targetScrollTop = currentScrollTop;

      if (e.deltaY > 0) {
        for (let i = 0; i < sections.length; i++) {
          if (sections[i].offsetTop > currentScrollTop + 1) {
            targetScrollTop = sections[i].offsetTop;
            break;
          }
        }
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].offsetTop < currentScrollTop - 1) {
            targetScrollTop = sections[i].offsetTop;
            break;
          }
        }
      }

      mainEl.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };

    mainEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      mainEl.removeEventListener('wheel', handleWheel);
    };
  }, [mainRef]);
}

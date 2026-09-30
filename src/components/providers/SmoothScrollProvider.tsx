'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger and Lenis
 * share one frame loop. Bypassed entirely when the user prefers reduced motion.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  if (reduced) return <>{children}</>;
  return <LenisScroll>{children}</LenisScroll>;
}

function LenisScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    const lenis = lenisRef.current?.lenis;
    lenis?.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis?.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

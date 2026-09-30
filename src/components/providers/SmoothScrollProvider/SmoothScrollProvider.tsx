'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import LenisScroll from '@/components/providers/LenisScroll/LenisScroll';
import type { SmoothScrollProviderProps } from '@/types/components/providers';

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
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

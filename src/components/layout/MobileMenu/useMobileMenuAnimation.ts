'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const CLIP_OPEN = 'inset(0 0 0% 0)';
const CLIP_CLOSED = 'inset(0 0 100% 0)';

export function useMobileMenuAnimation(
  overlayRef: RefObject<HTMLDivElement | null>,
  linkSelector: string,
  open: boolean,
) {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      if (reduced) {
        gsap.set(overlay, {
          clipPath: open ? CLIP_OPEN : CLIP_CLOSED,
          visibility: open ? 'visible' : 'hidden',
        });
        return;
      }
      if (open) {
        gsap
          .timeline()
          .set(overlay, { visibility: 'visible' })
          .to(overlay, {
            clipPath: CLIP_OPEN,
            duration: 0.7,
            ease: 'expo.inOut',
          })
          .from(
            overlay.querySelectorAll(linkSelector),
            {
              yPercent: 110,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power4.out',
            },
            '-=0.3',
          );
        return;
      }
      gsap.to(overlay, {
        clipPath: CLIP_CLOSED,
        duration: 0.5,
        ease: 'expo.inOut',
        onComplete: () => gsap.set(overlay, { visibility: 'hidden' }),
      });
    },
    { dependencies: [open, reduced] },
  );
}

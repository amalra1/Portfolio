'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import type { ParallaxProps } from '@/types/components/motion';

const MOBILE_TRAVEL_RATIO = 0.5;

export default function Parallax({
  children,
  amount = 10,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMediaAnimation(
    ({ mobile }) => {
      const el = ref.current;
      if (!el) return;
      const travel = mobile ? amount * MOBILE_TRAVEL_RATIO : amount;
      gsap.fromTo(
        el,
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [amount] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

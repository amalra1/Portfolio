'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';

type Props = {
  children: ReactNode;
  /** Total vertical travel in percent of the element's height. */
  amount?: number;
  className?: string;
  style?: CSSProperties;
};

/** Moves its child from -amount% to +amount% while crossing the viewport. */
export default function Parallax({
  children,
  amount = 10,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce, mobile } = ctx.conditions ?? {};
        if (reduce) return;
        const travel = mobile ? amount * 0.5 : amount;
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
      });
    },
    { scope: ref, dependencies: [amount] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

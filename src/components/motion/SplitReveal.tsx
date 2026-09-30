'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';

type Props = {
  as?: ElementType;
  children: ReactNode;
  type?: 'chars' | 'words' | 'lines';
  /** 'load' plays once fonts are ready; 'enter' plays when scrolled into view. */
  trigger?: 'load' | 'enter';
  start?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  id?: string;
};

/**
 * Splits text with GSAP SplitText and reveals each piece from a mask.
 * Reduced motion: text renders directly without splitting.
 */
export default function SplitReveal({
  as: Tag = 'span',
  children,
  type = 'chars',
  trigger = 'enter',
  start = 'top 85%',
  stagger = 0.03,
  duration = 1,
  delay = 0,
  ease = 'power4.out',
  className,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (ctx) => {
        const { reduce } = ctx.conditions ?? {};
        if (reduce) return;

        gsap.set(el, { visibility: 'hidden' });
        const play = () => {
          SplitText.create(el, {
            type: type === 'lines' ? 'lines' : `${type},lines`,
            mask: type,
            autoSplit: true,
            aria: 'auto',
            onSplit(self) {
              const targets =
                type === 'chars'
                  ? self.chars
                  : type === 'words'
                    ? self.words
                    : self.lines;
              gsap.set(el, { visibility: 'visible' });
              return gsap.from(targets, {
                yPercent: 110,
                duration,
                delay,
                stagger,
                ease,
                ...(trigger === 'enter'
                  ? { scrollTrigger: { trigger: el, start, once: true } }
                  : {}),
              });
            },
          });
        };
        document.fonts.ready.then(play);
      });
    },
    { scope: ref, dependencies: [children, type, trigger] },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

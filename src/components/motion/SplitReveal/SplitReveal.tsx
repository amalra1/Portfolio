'use client';

import { useRef } from 'react';
import { gsap, SplitText } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import type { SplitRevealProps } from '@/types/components/motion';

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
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useMediaAnimation(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { visibility: 'hidden' });
      const play = () => {
        SplitText.create(el, {
          type: type === 'lines' ? 'lines' : `${type},lines`,
          mask: type,
          autoSplit: true,
          aria: 'auto',
          onSplit(self) {
            const targets = {
              chars: self.chars,
              words: self.words,
              lines: self.lines,
            }[type];
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
    },
    { scope: ref, dependencies: [children, type, trigger] },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

'use client';

import { useRef } from 'react';
import { gsap, SplitText } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import type { ScrubWordsProps } from '@/types/components/motion';

export default function ScrubWords({
  as: Tag = 'p',
  children,
  className,
  start = 'top 80%',
  end = 'bottom 45%',
  from = 0.18,
}: ScrubWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useMediaAnimation(
    () => {
      const el = ref.current;
      if (!el) return;
      SplitText.create(el, {
        type: 'words',
        autoSplit: true,
        aria: 'auto',
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: from },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start, end, scrub: 0.4 },
            },
          );
        },
      });
    },
    { scope: ref, dependencies: [children] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

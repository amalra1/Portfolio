'use client';

import { useRef, type ElementType } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/lib/media';

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  start?: string;
  end?: string;
  from?: number;
};

/**
 * "Highlight as you read": every word fades from `from` to full opacity,
 * scrubbed to the scroll position of the paragraph.
 */
export default function ScrubWords({
  as: Tag = 'p',
  children,
  className,
  start = 'top 80%',
  end = 'bottom 45%',
  from = 0.18,
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

import type { CSSProperties, ElementType, ReactNode } from 'react';

export type SplitRevealType = 'chars' | 'words' | 'lines';

export type SplitRevealTrigger = 'load' | 'enter';

export interface ParallaxProps {
  children: ReactNode;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}

export interface ScrubWordsProps {
  as?: ElementType;
  children: string;
  className?: string;
  start?: string;
  end?: string;
  from?: number;
}

export interface SplitRevealProps {
  as?: ElementType;
  children: ReactNode;
  type?: SplitRevealType;
  trigger?: SplitRevealTrigger;
  start?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  id?: string;
}

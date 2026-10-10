import type { AnchorHTMLAttributes } from 'react';

export interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> {
  href: string;
}

export interface IconProps {
  className?: string;
}

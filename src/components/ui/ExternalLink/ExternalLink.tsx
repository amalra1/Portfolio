import type { ExternalLinkProps } from '@/types/components/ui';

export default function ExternalLink({
  children,
  ...anchorProps
}: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...anchorProps}>
      {children}
    </a>
  );
}

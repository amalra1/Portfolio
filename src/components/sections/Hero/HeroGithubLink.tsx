import { cx } from '@/lib/classNames';
import ExternalLink from '@/components/ui/ExternalLink/ExternalLink';
import GithubMark from '@/components/ui/GithubMark/GithubMark';
import type { HeroGithubLinkProps } from '@/types/components/sections';
import styles from './HeroGithubLink.module.css';

export default function HeroGithubLink({
  label,
  url,
  className,
}: HeroGithubLinkProps) {
  return (
    <ExternalLink href={url} className={cx(styles.button, 'mono', className)}>
      <GithubMark className={styles.mark} />
      <span>{label}</span>
      <span className={styles.arrowSlot} aria-hidden="true">
        <span className={styles.arrow}>↗</span>
      </span>
    </ExternalLink>
  );
}

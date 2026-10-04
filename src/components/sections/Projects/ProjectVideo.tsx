import { useRef } from 'react';
import { cx } from '@/lib/classNames';
import { useHoverPlayback } from '@/hooks/useHoverPlayback';
import type { ProjectVideoProps } from '@/types/components/sections';
import styles from './ProjectVideo.module.css';

export default function ProjectVideo({ src, triggerRef }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playing = useHoverPlayback(videoRef, triggerRef);

  return (
    <video
      ref={videoRef}
      className={cx(styles.video, playing && styles.playing)}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

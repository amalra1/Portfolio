'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { HOVER } from '@/constants/media';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const IN_VIEW_THRESHOLD = 0.6;

function playQuietly(video: HTMLVideoElement) {
  video.play().catch(() => video.pause());
}

function bindHover(video: HTMLVideoElement, trigger: HTMLElement) {
  const play = () => playQuietly(video);
  const pause = () => video.pause();
  const events = [
    ['pointerenter', play],
    ['pointerleave', pause],
    ['focusin', play],
    ['focusout', pause],
  ] as const;
  events.forEach(([type, handler]) => trigger.addEventListener(type, handler));
  return () =>
    events.forEach(([type, handler]) =>
      trigger.removeEventListener(type, handler),
    );
}

function bindInView(video: HTMLVideoElement) {
  const observer = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? playQuietly(video) : video.pause()),
    { threshold: IN_VIEW_THRESHOLD },
  );
  observer.observe(video);
  return () => observer.disconnect();
}

export function useHoverPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
): boolean {
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
    };
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    const trigger = triggerRef.current;
    if (!video || !trigger || reduced) return;
    const unbind = window.matchMedia(HOVER).matches
      ? bindHover(video, trigger)
      : bindInView(video);
    return () => {
      unbind();
      video.pause();
    };
  }, [videoRef, triggerRef, reduced]);

  return playing;
}

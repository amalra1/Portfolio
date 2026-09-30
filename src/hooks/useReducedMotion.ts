'use client';

import { useSyncExternalStore } from 'react';
import { REDUCED } from '@/lib/media';

function subscribe(callback: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED).matches;
}

function getServerSnapshot() {
  return false;
}

/** SSR-safe hook for prefers-reduced-motion. Always false on the server. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

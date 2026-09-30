import type Lenis from 'lenis';

/** Scrolls to a target using Lenis when available, native otherwise. */
export function scrollToTarget(
  target: string | HTMLElement | number,
  lenis?: Lenis,
  offset = 0,
) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }
  const el =
    typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

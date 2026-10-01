'use client';

import { useEffect, useRef } from 'react';

function measureNaturalFit(element: HTMLElement) {
  const probe = element.cloneNode(true) as HTMLElement;
  probe.removeAttribute('style');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.width = `${element.clientWidth}px`;
  element.after(probe);

  const fontSize = parseFloat(getComputedStyle(probe).fontSize);
  const ratio = probe.clientWidth / probe.scrollWidth;
  probe.remove();

  return { fontSize, ratio };
}

function shrinkToFit(element: HTMLElement) {
  const { fontSize, ratio } = measureNaturalFit(element);
  const fittedSize = ratio < 1 ? `${Math.floor(fontSize * ratio)}px` : '';
  if (element.style.fontSize !== fittedSize) {
    element.style.fontSize = fittedSize;
  }
}

export function useFitWords<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const fit = () => shrinkToFit(element);
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    document.fonts.ready.then(fit);

    return () => observer.disconnect();
  }, []);

  return ref;
}

'use client';

import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import type { MenuOverlayOptions } from '@/types/hooks';

export function useMenuOverlay({
  open,
  onClose,
  containerRef,
  returnFocusRef,
}: MenuOverlayOptions) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const returnFocusTarget = returnFocusRef.current;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    containerRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      returnFocusTarget?.focus();
    };
  }, [open, lenis, onClose, containerRef, returnFocusRef]);
}

'use client';

import { useRef } from 'react';
import { cx } from '@/lib/classNames';
import { useMenuOverlay } from '@/hooks/useMenuOverlay';
import NavList from '@/components/layout/NavList/NavList';
import type { MobileMenuProps } from '@/types/components/layout';
import { useMobileMenuAnimation } from './useMobileMenuAnimation';
import styles from './MobileMenu.module.css';

export default function MobileMenu({
  open,
  navigation,
  onNavigate,
  onClose,
  returnFocusRef,
}: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useMenuOverlay({ open, onClose, containerRef: overlayRef, returnFocusRef });
  useMobileMenuAnimation(overlayRef, `.${styles.link}`, open);

  return (
    <div
      id="mobile-menu"
      ref={overlayRef}
      className={cx(styles.overlay, 'band-red')}
      aria-hidden={!open}
    >
      <nav aria-label="Mobile">
        <NavList
          navigation={navigation}
          onNavigate={onNavigate}
          linkTabIndex={open ? 0 : -1}
          classNames={{
            list: cx(styles.list, 'display'),
            item: styles.item,
            link: styles.link,
            number: styles.num,
          }}
        />
      </nav>
      <div className={cx(styles.footer, 'mono')}>
        <span>Pedro Chapelin</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

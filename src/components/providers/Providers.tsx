'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import SmoothScrollProvider from './SmoothScrollProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </LanguageProvider>
  );
}

'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider/SmoothScrollProvider';
import type { ProvidersProps } from '@/types/components/providers';

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </LanguageProvider>
  );
}

import type { Metadata, Viewport } from 'next';
import Providers from '@/components/providers/Providers/Providers';
import type { RootLayoutProps } from '@/types/components/app';
import { fontClassNames } from './fonts';
import 'lenis/dist/lenis.css';
import '@/styles/tokens.css';
import '@/styles/reset.css';
import '@/styles/focus.css';
import '@/styles/utilities.css';
import '@/styles/motion.css';

export const metadata: Metadata = {
  title: 'Pedro Chapelin — Full-Stack Developer',
  description:
    'Portfolio of Pedro Amaral Chapelin, Full-Stack developer working with Java, React, Computer Vision and Game Development.',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { fontClassNames } from './fonts';
import Providers from '@/components/providers/Providers';
import 'lenis/dist/lenis.css';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

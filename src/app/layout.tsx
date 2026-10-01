import type { Metadata, Viewport } from 'next';
import Providers from '@/components/providers/Providers/Providers';
import { SITE_NAME, SITE_URL } from '@/constants/site';
import type { RootLayoutProps } from '@/types/components/app';
import { fontClassNames } from './fonts';
import 'lenis/dist/lenis.css';
import '@/styles/tokens.css';
import '@/styles/reset.css';
import '@/styles/focus.css';
import '@/styles/utilities.css';
import '@/styles/motion.css';

const TITLE = 'Pedro Chapelin — Full-Stack Developer';
const DESCRIPTION =
  'Portfolio of Pedro Amaral Chapelin, Full-Stack developer working with Java, React, Computer Vision and Game Development.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    alternateLocale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
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

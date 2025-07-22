import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { poppins } from './fonts';
import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Pedro Amaral Chapelin Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} ${poppins.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

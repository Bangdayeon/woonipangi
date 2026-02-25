import Footer from '@/shared/ui/Footer/Footer';
import Header from '@/shared/ui/Header/Header';
import { ToastProvider } from '@/shared/ui/Toast/ToastProvider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ReactNode } from 'react';

import QueryProviders from './providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://woonipangi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: '우니팡이', template: '%s | 우니팡이' },
  description: '우니팡이 공식 홈페이지',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: { default: '우니팡이', template: '%s | 우니팡이' },
    description: '우니팡이 공식 홈페이지',
    url: baseUrl,
    siteName: '우니팡이',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: { default: '우니팡이', template: '%s | 우니팡이' },
    description: '우니팡이 공식 홈페이지',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="custom-scrollbar grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S3P40XVJ26"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S3P40XVJ26');
        `}
        </Script>
        <QueryProviders>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ToastProvider>
        </QueryProviders>
      </body>
    </html>
  );
}

import Footer from '@/shared/ui/Footer/Footer';
import Header from '@/shared/ui/Header/Header';
import { ToastProvider } from '@/shared/ui/Toast/ToastProvider';
import '@/styles/globals.css';
import type { Metadata } from 'next';

import QueryProviders from './providers';

export const metadata: Metadata = {
  title: '우니팡이',
  description: '우니팡이 공식 홈페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
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

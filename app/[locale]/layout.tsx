import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { Footer, Header } from '@/components/shared';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ThemeProvider from './components/ThemeProvider';
import StoreProvider from './components/StoreProvider';

export const metadata: Metadata = {
  title: 'Movie Finder',
  description: 'Your site to know what to watch next!',
};

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: {
    locale: string;
  };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="mx-auto flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <Header />
              <main className="mx-auto flex flex-1 justify-center">
                {children}
              </main>
              <Footer />
            </StoreProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/* eslint-disable react/function-component-definition */
import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { Backdrop } from 'app/components/backdrop';
import { Footer } from 'app/components/footer';
import { getMessages } from 'next-intl/server';
import { auth } from '@/auth';
import { Splash } from '@/components/splash';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const inter = Inter({ subsets: ['latin'] });

const NavbarCSR = dynamic(() => import('app/components/navbar/navbar'), {
  ssr: false,
});

const CursorCSR = dynamic(() => import('app/components/cursor/cursor'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Hello! I'm Walter Morales",
  description:
    "I'm a software engineer and a full-stack developer. I love to build things and learn new technologies.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={locale} className={inter.className}>
      <body className="relative mx-auto text-white">
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <Splash />
          <Backdrop />
          <NavbarCSR user={session?.user} />
          <CursorCSR user={session?.user} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

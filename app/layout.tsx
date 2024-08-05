/* eslint-disable react/function-component-definition */
import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { Backdrop } from './components/backdrop';

const inter = Inter({ subsets: ['latin'] });

const NavbarCSR = dynamic(() => import('@/app/components/navbar/navbar'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Hello! I'm Walter Morales",
  description:
    "I'm a software engineer and a full-stack developer. I love to build things and learn new technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="relative mx-auto text-white ">
        <Backdrop />
        <NavbarCSR />
        {children}
        {/* <PlayerCSR /> */}
      </body>
    </html>
  );
}

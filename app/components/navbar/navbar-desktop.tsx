/* eslint-disable @next/next/no-img-element */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { User } from 'next-auth';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Clock } from './clock';
import GithubLogin from './github-login';
import GoogleLogin from './google-login';

type Weather = {
  tempC: number;
  icon: string;
};

type Props = {
  weather?: Weather;
  user?: User;
};

const NavbarDesktop: FC<Props> = ({ weather, user }) => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const links = [
    { name: t('Home'), href: '/' },
    { name: t('Guestbook'), href: '/guestbook' },
    { name: t('Blog'), href: '/blog' },
    { name: t('Services'), href: '/services' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        ref.current?.classList.remove('backdrop-blur-lg', 'bg-primary/70');
        ref.current?.classList.add('bg-primary');
      } else {
        ref.current?.classList.add('backdrop-blur-lg', 'bg-primary/70');
        ref.current?.classList.remove('bg-primary');
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (
        !['account-center', 'account-center-button'].includes(
          (e.target as HTMLElement).id,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetch('/api/auth/register', {
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image,
          source: 'google',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }
  }, [user]);

  return (
    <header
      ref={ref}
      className="fixed left-0 top-0 z-[999] h-[var(--nav-height)] w-full bg-primary"
    >
      <nav className="container relative flex size-full flex-wrap items-center justify-between">
        <ul className="inline-flex w-2/3 items-start justify-between">
          {links.map((link) => (
            <li key={link.href} className="flex w-full">
              <Link
                href={link.href}
                className="group size-full py-4 text-left transition-all hover:scale-110"
              >
                <span
                  className={classNames(
                    pathname === link.href && 'font-bold solo-gradient text-xl',
                  )}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex w-1/4 items-start justify-start gap-2 py-2">
          <div className="inline-flex items-center justify-center gap-1 font-light">
            <span className="inline-block text-xs text-gray-400">
              {weather?.tempC?.toFixed(0)} °C
            </span>
            <span className="relative">
              <img
                src={weather?.icon ?? ''}
                alt="Weather icon"
                className="inline-block size-6"
                width={24}
                height={24}
              />
            </span>
          </div>
          <div className="flex flex-col">
            <span>San Salvador, El Salvador</span>
            <Clock className="text-sm" />
          </div>
        </div>
        <div className="absolute right-0">
          <button
            id="account-center-button"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="relative z-20 aspect-square size-8 rounded bg-white"
          >
            <span className="sr-only">Account center</span>
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div
                key="account-center"
                id="account-center"
                className={twMerge(
                  'absolute right-0 top-0 z-20 flex size-40 items-center justify-around rounded bg-white p-2 text-primary',
                  user ? 'flex-col' : 'flex-row',
                )}
                initial={{ width: 0, height: 0, opacity: 0, display: 'none' }}
                animate={{
                  width: user ? '10rem' : '27rem',
                  height: user ? '13rem' : '5rem',
                  opacity: 1,
                  display: 'flex',
                }}
                exit={{
                  width: 0,
                  height: 0,
                  opacity: 0,
                  display: 'none',
                }}
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.5,
                }}
              >
                {user ? (
                  <>
                    <Image
                      src={user.image ?? ''}
                      alt="User profile"
                      className="size-20 rounded-full"
                      width={80}
                      height={80}
                    />
                    <div className="space-y-4 text-center">
                      <span className="text-lg font-medium">
                        Hi {user.name?.split(' ')[0]} 👋
                      </span>
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="rounded-full bg-primary px-6 py-2 text-white shadow transition-all hover:scale-105"
                      >
                        {t('Logout')}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{t('Login')}</span>
                    <div className="flex items-center justify-center gap-4">
                      <GoogleLogin />
                      <GithubLogin />
                    </div>
                  </>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default NavbarDesktop;

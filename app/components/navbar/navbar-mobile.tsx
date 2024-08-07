/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Clock, links } from './atoms';

const Bar: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <div
    className={classNames(
      'w-6 h-[2px] bg-white my-[5px] rounded-full transition-all translate-x-0',
      className,
    )}
  />
);

const NavbarMobile: FC = () => {
  const pathname = usePathname();
  const pathRef = useRef<string>(pathname);
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const nav = useRef<HTMLElement>(null);

  const updateHeight = () => {
    setHeight(nav.current?.clientHeight ?? 0);
  };

  useEffect(() => {
    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const ref = useRef<HTMLDivElement>(null);

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

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) pathRef.current = window.location.hash;
  }, [pathname, open]);

  const isCurrentPath = (href: string) => {
    if (href.startsWith('#')) {
      return pathRef.current === href;
    }

    return pathname === href;
  };

  return (
    <header ref={ref} className="sticky top-0 z-[999]">
      <nav
        ref={nav}
        className="flex flex-wrap items-start justify-between p-4 text-sm"
      >
        <div className="flex flex-col items-start justify-center">
          <span>San Salvador, El Salvador</span>
          <Clock />
        </div>
        <button
          type="button"
          className="px-2 py-1"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <Bar className={classNames(open && 'translate-y-[5px] rotate-45')} />
          <Bar className={classNames(open && 'opacity-0')} />
          <Bar
            className={classNames(open && '-translate-y-[9px] -rotate-45')}
          />
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="h-dscreen w-dscreen fixed right-0 top-0 z-[990] bg-primary"
            style={{ marginTop: `${height}px` }}
            tabIndex={-1}
          >
            <ul className="flex h-full flex-col items-center justify-start">
              {links.map((link) => (
                <li key={link.href} className="flex w-full">
                  <Link
                    onClick={() => setOpen(false)}
                    href={link.href}
                    className="group size-full py-4 text-center transition-all hover:scale-110 hover:bg-white/10"
                  >
                    <span
                      className={classNames(
                        isCurrentPath(link.href) && 'font-bold solo-gradient',
                      )}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default NavbarMobile;

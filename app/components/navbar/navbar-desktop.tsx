'use client';

import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Clock, links } from './atoms';

const NavbarDesktop: FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  return (
    <header ref={ref} className="sticky left-0 top-0 z-[999] bg-primary py-6">
      <nav className="container relative flex w-full flex-wrap items-center justify-between">
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
        <div className="flex w-1/4 flex-col items-start justify-center py-2">
          <span>San Salvador, El Salvador</span>
          <Clock className="text-sm" />
        </div>
        <div className="absolute right-0">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="relative z-20 aspect-square size-8 rounded bg-white"
          >
            <span className="sr-only">Account center</span>
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div
                id="account-center"
                className="absolute right-0 top-0 z-10 size-40 rounded bg-white p-2 text-primary shadow"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: '10rem',
                  height: '10rem',
                  opacity: 1,
                }}
                exit={{
                  width: 0,
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.5,
                }}
              >
                <span>Google</span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default NavbarDesktop;

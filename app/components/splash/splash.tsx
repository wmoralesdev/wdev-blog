'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { ArrowUpRightIcon, HeartIcon } from '@heroicons/react/20/solid';
import { Backdrop } from '../backdrop';

const Splash: FC = () => {
  const [played, setPlayed] = useState(localStorage.getItem('played') !== null);

  const [ballTimeout, setBallTimeout] = useState<NodeJS.Timeout | null>(() => {
    return setTimeout(() => {
      setBallTimeout(null);
    }, 2000);
  });

  const [textTimeout, setTextTimeout] = useState<NodeJS.Timeout | null>(() => {
    return setTimeout(() => {
      setTextTimeout(null);
    }, 2000);
  });

  const [continueTimeout, setContinueTimeout] = useState<NodeJS.Timeout | null>(
    () => {
      return setTimeout(() => {
        setContinueTimeout(null);
      }, 3000);
    },
  );

  return (
    <AnimatePresence>
      {!played ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 1 }}
          className="fixed z-[10001] h-screen w-screen overflow-hidden"
        >
          <Backdrop />
          <div className="relative flex size-full items-center justify-center">
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0, translateX: 0 }}
                animate={{ scale: 1, translateX: ballTimeout ? 0 : '-250%' }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 1 }}
                className="absolute inline-flex aspect-square size-20 items-center justify-center rounded-full bg-white text-3xl hover:bg-solo"
              >
                👋
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              {!textTimeout ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  exit={{ width: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 1 }}
                  className="absolute inline-flex items-center justify-center gap-1 overflow-hidden text-nowrap rounded-full text-2xl font-light"
                >
                  Made with <HeartIcon className="size-8 text-red-400" /> using
                  Next.js
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {!continueTimeout ? (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 1 }}
                  onClick={() => {
                    localStorage.setItem('played', 'true');
                    setPlayed(true);
                    setBallTimeout(null);
                    setTextTimeout(null);
                    setContinueTimeout(null);
                  }}
                  className="mt-40 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 text-xl font-bold text-primary hover:bg-solo hover:text-white"
                >
                  Continue
                  <ArrowUpRightIcon className="size-6" />
                </motion.button>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Splash;

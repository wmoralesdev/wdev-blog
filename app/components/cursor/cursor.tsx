'use client';

import { User } from 'next-auth';
import Image from 'next/image';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  user?: User;
};

const Cursor: FC<Props> = ({ user }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        if (cursorRef.current) {
          const mouseX = clientX - cursorRef.current.clientWidth / 2 - 5;
          const mouseY = clientY - cursorRef.current.clientHeight / 2 - 5;

          cursorRef.current.style.transform = `translate3d(${mouseX - cursorRef.current.clientWidth / 2}px, ${mouseY - cursorRef.current.clientHeight / 2}px, 0)`;
        }
      });
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', () => {});
      }
    };
  }, []);

  return (
    <div className="fixed h-dvh w-screen overflow-hidden">
      {showCursor ? (
        <div
          ref={cursorRef}
          className="relative hidden size-14 rounded-full bg-solo md:block"
        >
          {user ? (
            <Image
              src={user?.image ?? ''}
              alt="User profile"
              className="rounded-full p-1"
              layout="fill"
            />
          ) : null}
        </div>
      ) : null}
      <button
        onClick={() => setShowCursor(!showCursor)}
        type="button"
        className={twMerge(
          'hidden lg:block absolute right-10 bottom-10 text-primary rounded-full px-4 py-2 font-medium text-sm',
          'transition-all hover:scale-110',
          showCursor ? 'bg-white' : 'bg-white/20 text-white/50',
        )}
      >
        Cursor {!showCursor ? 'on' : 'off'}
      </button>
    </div>
  );
};

export default Cursor;

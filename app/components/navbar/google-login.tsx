'use client;';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';
import { GoogleIcon } from '../icons';

type Props = {
  mobile?: boolean;
};

const GoogleLogin: FC<Props> = ({ mobile }) => {
  return (
    <button
      type="button"
      onClick={() => signIn('google')}
      className={twMerge(
        'flex items-center justify-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-primary transition-all hover:scale-105',
        mobile && 'w-full',
      )}
    >
      <GoogleIcon className="size-6" />
      <span>Google</span>
    </button>
  );
};

export default GoogleLogin;

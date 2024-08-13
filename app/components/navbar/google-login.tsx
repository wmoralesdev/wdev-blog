'use client;';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { GoogleIcon } from '../icons';

const GoogleLogin: FC = () => {
  return (
    <button
      type="button"
      onClick={() => signIn('google')}
      className="flex items-center justify-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-primary transition-all hover:scale-105"
    >
      <GoogleIcon className="size-6" />
      <span>Google</span>
    </button>
  );
};

export default GoogleLogin;

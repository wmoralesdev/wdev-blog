'use client;';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { GithubIcon } from '../icons';

const GithubLogin: FC = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-white transition-all hover:scale-105"
      onClick={() => signIn('github')}
    >
      <GithubIcon className="size-6" />
      <span className="text-white">Github</span>
    </button>
  );
};

export default GithubLogin;

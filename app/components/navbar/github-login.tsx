'use client;';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';
import { GithubIcon } from '../icons';

type Props = {
  mobile?: boolean;
};

const GithubLogin: FC<Props> = ({ mobile }) => {
  return (
    <button
      type="button"
      className={twMerge(
        'flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 transition-all hover:scale-105',
        mobile ? 'w-full bg-white text-primary' : 'bg-primary text-white',
      )}
      onClick={() => signIn('github')}
    >
      <GithubIcon
        className={twMerge('size-6', mobile ? 'text-primary' : 'text-white')}
      />
      <span className={twMerge(mobile ? 'text-primary' : 'text-white')}>
        Github
      </span>
    </button>
  );
};

export default GithubLogin;

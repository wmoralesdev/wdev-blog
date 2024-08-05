import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

const NotFound: FC = () => (
  <main className="container flex h-[85svh] flex-col items-center justify-center gap-4">
    <ExclamationTriangleIcon className="size-20 text-white" />
    <h1 className="text-4xl">Under construction</h1>
  </main>
);

export default NotFound;

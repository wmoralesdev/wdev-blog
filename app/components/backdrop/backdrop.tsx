'use client';

import { FC } from 'react';

const Backdrop: FC = () => (
  <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-primary">
    <div
      className="mt-40
      size-60 rounded-full bg-solo/30
      blur-3xl md:size-72 lg:mt-72 lg:size-96"
    />
    <div
      className="
      ml-32 size-60 rounded-full bg-white/10
      blur-3xl md:size-72 lg:-mt-10 lg:ml-44 lg:size-96"
    />

    <div
      className="absolute right-40 bottom-20 mt-40
      size-60 rounded-full bg-solo/30
      blur-3xl md:size-72 lg:size-96"
    />
    <div
      className="absolute -right-10 bottom-40 
      ml-32 size-60 rounded-full bg-white/10
      blur-3xl md:size-72 lg:-mt-10 lg:ml-44 lg:size-96"
    />
  </div>
);

export default Backdrop;

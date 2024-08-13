'use client';

import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = {
  count: number;
};

const Hero: FC<Props> = ({ count }) => {
  const t = useTranslations('Guestbook');

  let variant = 'Empty';

  if (count === 0) {
    variant = 'Empty';
  } else if (count > 0 && count < 10) {
    variant = 'Few';
  } else if (count >= 10 && count < 20) {
    variant = 'Some';
  } else if (count >= 20) {
    variant = 'Many';
  } else {
    variant = 'Full';
  }

  const random = Math.floor(Math.random() * 3);
  const message = t(`${variant}.Variant${random + 1}`);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="solo-gradient text-xl font-bold lg:text-4xl">
        <span className="solo-gradient" suppressHydrationWarning>
          Guestbook
        </span>
      </h1>
      <h2 className="text-lg font-light lg:text-2xl">{message}</h2>
    </div>
  );
};

export default Hero;

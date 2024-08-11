'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import { Cobe } from 'app/components/cobe';
import { Section } from 'app/components/layout';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('Homepage');

  return (
    <Section
      className="flex flex-col-reverse items-center justify-center gap-4
    lg:flex-row lg:items-center"
    >
      <div
        className="flex flex-col items-start justify-start gap-4
          lg:w-3/4 lg:gap-8"
      >
        <div
          className="relative size-12 rounded-full
            lg:size-20"
        >
          <Image
            src="/img/me.jpg"
            alt="Walter Morales"
            className="rounded-full"
            layout="fill"
          />
          <div className="absolute -z-10 size-full rounded-full bg-solo blur" />
        </div>
        <h1
          className="text-3xl
            lg:text-6xl"
        >
          {t('Greetings.Salute')}{' '}
          <strong className="solo-gradient">Walter Morales</strong>
        </h1>
        <h2
          className="text-xl font-light
            lg:text-3xl"
        >
          {t('Greetings.Build')}{' '}
          <strong className="solo-gradient font-bold">
            {t('Greetings.StrongBuild')}
          </strong>
          <br /> {t('Greetings.Something')}{' '}
          <strong className="solo-gradient font-bold">
            {t('Greetings.StrongSomething')}
          </strong>
        </h2>
        <Link
          href="#about-me"
          className="group inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-lg text-primary
              transition-all hover:scale-110"
        >
          {t('Meet')}
          <ChevronDownIcon className="ml-2 size-6" />
        </Link>
      </div>
      <div
        className="w-4/5
          lg:w-1/4"
      >
        <Cobe />
      </div>
    </Section>
  );
};

export default Hero;

'use client';

import {
  DotnetIcon,
  GithubIcon,
  LinkedInIcon,
  InstagramIcon,
  KubernetesIcon,
} from 'app/components/icons';
import { Section } from 'app/components/layout';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('Homepage.About');

  return (
    <Section className="mt-[0!important] flex w-full flex-col items-start justify-center gap-8 lg:h-1/2">
      <h2
        className="text-xl
          lg:text-4xl"
      >
        {t('Title')}{' '}
        <span className="solo-gradient">
          <strong>{t('Gradient')}</strong>
        </span>
      </h2>
      <div
        className="grid w-full grid-cols-3 grid-rows-5 gap-4 
          lg:grid-cols-10 lg:grid-rows-2"
      >
        {/* Exp */}
        <div
          className="grid-item col-span-2 flex-row gap-2
            lg:row-span-2 lg:flex-col lg:gap-0"
        >
          <strong
            className="text-5xl 
              lg:text-8xl"
          >
            4+
          </strong>
          <small
            className="text-base
              lg:text-lg"
          >
            {t('Content.Exp')}
          </small>
        </div>
        {/* Stack */}
        <div
          className="grid-item aspect-square gap-2
            lg:col-span-2 lg:row-span-2"
        >
          <DotnetIcon
            className="size-12
              lg:size-32"
          />
          <small
            className="text-sm
              lg:text-lg"
          >
            {t('Content.Stack')}
          </small>
        </div>
        {/* Clients */}
        <div
          className="grid-item col-span-3 row-span-1 h-full flex-row gap-2 
            lg:col-start-3 lg:row-start-1 lg:gap-4"
        >
          <small
            className="text-lg
              lg:text-xl"
          >
            {t('Content.Clients1')}
          </small>
          <strong
            className="text-5xl
              lg:text-6xl"
          >
            5+
          </strong>
          <small
            className="text-lg
              lg:text-xl"
          >
            {t('Content.Clients2')}
          </small>
        </div>
        {/* Title */}
        <div
          className="grid-item col-span-3 row-span-1 h-full flex-row gap-2 
            lg:col-start-3 lg:row-start-2 lg:gap-4"
        >
          <strong
            className="text-2xl
              lg:text-3xl"
          >
            Sr
          </strong>
          <small
            className="text-2xl
              lg:text-3xl"
          >
            Software Engineer
          </small>
        </div>
        {/* Github */}
        <a
          href="https://github.com/wmoralesdev"
          target="_blank"
          className="grid-item row-start-3 aspect-square gap-2
              lg:col-start-8 lg:row-start-2"
          rel="noreferrer"
        >
          <span className="sr-only">Github</span>
          <GithubIcon
            className="size-12
              lg:size-16"
          />
        </a>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/wmoralesdev/"
          target="_blank"
          className="grid-item row-start-3 aspect-square gap-2
              lg:col-start-9 lg:row-start-2"
          rel="noreferrer"
        >
          <span className="sr-only">LinkedIn</span>
          <LinkedInIcon
            className="size-12 
                lg:size-16"
          />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/wmoralesdev/"
          target="_blank"
          className="grid-item row-start-3 aspect-square gap-2
              lg:col-start-10 lg:row-start-2"
          rel="noreferrer"
        >
          <span className="sr-only">Instagram</span>
          <InstagramIcon
            className="size-12
              lg:size-16"
          />
        </a>
        {/* Learning */}
        <div
          className="grid-item col-span-3 row-span-1 h-full flex-row gap-4
            lg:gap-6"
        >
          <small
            className="text-lg
              lg:text-xl"
          >
            {t('Content.Learning')}
          </small>
          <KubernetesIcon
            className="size-12 
              lg:size-16"
          />
        </div>
      </div>
    </Section>
  );
};

export default About;

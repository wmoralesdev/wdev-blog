'use client';

import { CalendarIcon } from '@heroicons/react/20/solid';
import { Section } from 'app/components/layout';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import HorizontalTimeline from './timeline-horizontal';

type Experience = {
  from: Date;
  to?: Date;
  company: string;
  role: string;
  description: string;
};

const VerticalTimeline: FC<{ experience: Experience[] }> = ({ experience }) => (
  <ol
    className="relative ml-4 border-s border-white/20 
  lg:hidden"
  >
    {experience.map((exp) => (
      <li
        key={`${exp.from.toISOString()}-${exp.company}`}
        className="mb-10 ms-8"
      >
        <span className="absolute -start-3 flex size-6 items-center justify-center rounded-full bg-white ring-4 ring-solo">
          <CalendarIcon className="size-3 fill-solo stroke-solo text-solo" />
        </span>
        <h3
          className="font-semibold 
          lg:text-lg"
        >{`${exp.company} - ${exp.role}`}</h3>
        <time
          className="mb-1 text-xs font-normal leading-none text-gray-400
          lg:text-sm"
        >
          {exp.from.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })}
          {' - '}
          {exp.to
            ? exp.to.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })
            : 'Now'}
        </time>
        <p className="text-sm font-light">{exp.description}</p>
      </li>
    ))}
  </ol>
);

const Timeline = () => {
  const t = useTranslations('Homepage.Experience');

  const experience: Experience[] = [
    {
      from: new Date(2020, 0, 1),
      to: new Date(2020, 10, 1),
      company: 'VincuHub',
      role: t('Content.Company1.Position'),
      description: t('Content.Company1.Description'),
    },
    {
      from: new Date(2020, 10, 1),
      to: new Date(2022, 0, 1),
      company: 'Elaniin',
      role: t('Content.Company2.Position'),
      description: t('Content.Company2.Description'),
    },
    {
      from: new Date(2021, 3, 1),
      to: new Date(2022, 3, 1),
      company: 'InnRoad',
      role: t('Content.Company3.Position'),
      description: t('Content.Company3.Description'),
    },
    {
      from: new Date(2022, 3, 1),
      to: new Date(2022, 11, 1),
      company: 'Resultier',
      role: t('Content.Company4.Position'),
      description: t('Content.Company4.Description'),
    },
    {
      from: new Date(2023, 0, 1),
      to: new Date(2023, 2, 1),
      company: 'Ravn',
      role: t('Content.Company5.Position'),
      description: t('Content.Company5.Description'),
    },
    {
      from: new Date(2023, 3, 1),
      company: 'Southworks',
      role: t('Content.Company6.Position'),
      description: t('Content.Company6.Description'),
    },
    {
      from: new Date(2023, 3, 1),
      to: new Date(2024, 0, 1),
      company: 'Freelance',
      role: t('Content.Company7.Position'),
      description: t('Content.Company7.Description'),
    },
  ];

  return (
    <Section
      small
      className="flex w-full flex-col gap-8 lg:h-1/2 lg:justify-center"
    >
      <h2
        className="text-xl
          lg:text-4xl"
      >
        {t('Title')}{' '}
        <span className="solo-gradient">
          <strong>{t('Gradient')}</strong> {t('Complement')}
        </span>
      </h2>
      <VerticalTimeline experience={experience} />
      <HorizontalTimeline experience={experience} />
    </Section>
  );
};

export default Timeline;

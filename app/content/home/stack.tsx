'use client';

import {
  AwsIcon,
  AzureIcon,
  DockerIcon,
  DotnetIcon,
  JavascriptIcon,
  MongoIcon,
  NestIcon,
  NextIcon,
  PostgresIcon,
  ReactIcon,
  SqlServerIcon,
  TailwindIcon,
  TypescriptIcon,
} from 'app/components/icons';
import { Section } from 'app/components/layout';
import { Marquee } from 'app/components/marquee';
import { useTranslations } from 'next-intl';

const Stack = () => {
  const t = useTranslations('Homepage.Stack');

  return (
    <Section className="flex w-full max-w-full flex-col items-start justify-center gap-8 lg:h-1/2">
      <h2
        className="text-xl
          lg:text-4xl"
      >
        {t('Title')}{' '}
        <span className="solo-gradient">
          <strong>{t('Gradient')}</strong> {t('Complement')}
        </span>
      </h2>
      <div className="w-full">
        <Marquee
          items={[
            { label: 'AWS', Icon: AwsIcon },
            { label: 'Azure', Icon: AzureIcon },
            { label: 'Docker', Icon: DockerIcon },
            { label: '.NET', Icon: DotnetIcon },
            { label: 'JavaScript', Icon: JavascriptIcon },
            { label: 'MongoDB', Icon: MongoIcon },
            { label: 'NestJS', Icon: NestIcon },
            { label: 'NextJS', Icon: NextIcon },
            { label: 'PostgreSQL', Icon: PostgresIcon },
            { label: 'ReactJS', Icon: ReactIcon },
            { label: 'SQL Server', Icon: SqlServerIcon },
            { label: 'Tailwind CSS', Icon: TailwindIcon },
            { label: 'TypeScript', Icon: TypescriptIcon },
          ]}
          direction="forwards"
          speed={30}
          className="hidden lg:block"
        />
      </div>
      <div className="w-full space-y-20 lg:hidden">
        <Marquee
          items={[
            { label: 'AWS', Icon: AwsIcon },
            { label: 'Azure', Icon: AzureIcon },
            { label: 'Docker', Icon: DockerIcon },
            { label: '.NET', Icon: DotnetIcon },
          ]}
          direction="forwards"
          speed={15}
        />
        <Marquee
          items={[
            { label: 'JavaScript', Icon: JavascriptIcon },
            { label: 'MongoDB', Icon: MongoIcon },
            { label: 'NestJS', Icon: NestIcon },
            { label: 'NextJS', Icon: NextIcon },
          ]}
          direction="backwards"
          speed={15}
        />
        <Marquee
          items={[
            { label: 'PostgreSQL', Icon: PostgresIcon },
            { label: 'ReactJS', Icon: ReactIcon },
            { label: 'SQL Server', Icon: SqlServerIcon },
            { label: 'Tailwind CSS', Icon: TailwindIcon },
            { label: 'TypeScript', Icon: TypescriptIcon },
          ]}
          direction="forwards"
          speed={15}
        />
      </div>
    </Section>
  );
};

export default Stack;

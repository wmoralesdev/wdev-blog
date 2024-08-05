import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Cobe } from './components/cobe';
import {
  AwsIcon,
  AzureIcon,
  DockerIcon,
  DotnetIcon,
  GithubIcon,
  InstagramIcon,
  JavascriptIcon,
  KubernetesIcon,
  LinkedInIcon,
  MongoIcon,
  NestIcon,
  NextIcon,
  PostgresIcon,
  ReactIcon,
  SqlServerIcon,
  TailwindIcon,
  TypescriptIcon,
} from './components/icons';
import { Marquee } from './components/marquee';

const Home: FC = () => {
  return (
    <main className="container flex flex-col gap-10">
      <section
        className="lg:[h-70dvh] flex h-[85dvh] flex-col-reverse items-start justify-center
      gap-4 lg:flex-row lg:items-center"
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
            Hello, I&apos;m{' '}
            <strong className="solo-gradient">Walter Morales</strong>
          </h1>
          <h2
            className="text-xl font-light
          lg:text-3xl"
          >
            I&apos;ll help you{' '}
            <strong className="solo-gradient font-bold">build</strong>
            <br />
            something{' '}
            <strong className="solo-gradient font-bold">amazing</strong>
          </h2>
          <Link
            href="#about-me"
            className="group inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-lg text-primary
            transition-all hover:scale-110"
          >
            Get to know me
            <ChevronDownIcon className="ml-2 size-6" />
          </Link>
        </div>
        <div
          className="mx-auto w-4/5
        lg:w-1/4"
        >
          <Cobe />
        </div>
      </section>
      <section
        className=" h-[90dvh] w-full space-y-4
      lg:h-[40dvh]"
      >
        <h2
          className="text-xl
        lg:text-4xl"
        >
          Wanted to know more{' '}
          <span className="solo-gradient">
            <strong>about me</strong>?
          </span>
        </h2>
        <div
          className="grid grid-cols-3 grid-rows-5 gap-4 
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
              yrs of exp
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
              main stack
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
              Clients from
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
              countries
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
              Currently learning
            </small>
            <KubernetesIcon
              className="size-12 
            lg:size-16"
            />
          </div>
        </div>
      </section>
      <section
        className="h-[90dvh] space-y-20
      lg:h-[40dvh]"
      >
        <h2
          className="text-xl
        lg:text-4xl"
        >
          I&apos;m also quite{' '}
          <span className="solo-gradient">
            <strong>profficient</strong> with
          </span>
        </h2>
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
        <Marquee
          items={[
            { label: 'AWS', Icon: AwsIcon },
            { label: 'Azure', Icon: AzureIcon },
            { label: 'Docker', Icon: DockerIcon },
            { label: '.NET', Icon: DotnetIcon },
          ]}
          direction="forwards"
          speed={15}
          className="lg:hidden"
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
          className="lg:hidden"
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
          className="lg:hidden"
        />
      </section>
    </main>
  );
};

export default Home;

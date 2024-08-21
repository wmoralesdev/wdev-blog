import { Counter } from '@/components/counter';
import {
  LightBulbIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { FC } from 'react';

const Blog: FC = () => {
  return (
    <main className="container flex flex-col pb-20">
      <div className="flex flex-col gap-8 pt-[var(--nav-height)]">
        <div className="space-y-4">
          <h1 className="solo-gradient text-xl font-bold lg:text-4xl">
            <span className="solo-gradient" suppressHydrationWarning>
              Blog
            </span>
          </h1>
          <h2 className="text-lg font-light lg:text-2xl">
            Let&apos; hope something here works for you 🤞
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <div className="grid grid-cols-2 gap-4 divide-x divide-white/20">
            <div className="flex min-h-20 w-full flex-col gap-1 p-4">
              <small className="text-sm">Posts</small>
              <div className="inline-flex w-full items-center justify-start gap-4">
                <Counter
                  from={0}
                  to={10}
                  duration={3}
                  className="text-4xl font-extrabold text-white"
                />
                <PencilIcon className="size-6 text-white" />
              </div>
              <small className="text-xs font-light text-gray-400">
                Last updated on{' '}
                <time dateTime="2022-01-01">January 1, 2022</time>
              </small>
            </div>
            <div className="flex min-h-20 w-full flex-col gap-1 p-4">
              <small className="text-sm">Total Views</small>
              <div className="inline-flex w-full items-center justify-start gap-4">
                <Counter
                  from={0}
                  to={125}
                  className="text-4xl font-extrabold text-white"
                />
                <LightBulbIcon className="size-6 text-white" />
              </div>
              <small className="text-xs font-light text-gray-400">
                21% more than last month
              </small>
            </div>
          </div>
          <form className="relative inline-flex w-full items-center justify-center">
            <input
              className="peer w-full rounded-lg border border-white/30 bg-white/10 p-4 pl-10 text-sm
              font-light text-white transition-all placeholder:text-white/40 placeholder:text-opacity-70 focus:outline-none focus:ring-2 focus:ring-solo"
              placeholder="Search posts"
            />
            <MagnifyingGlassIcon className="absolute left-4 size-4 text-white transition-all peer-focus:text-solo" />
          </form>
        </div>
        <div className="flex h-96 w-full flex-col items-center justify-center gap-2 rounded-lg bg-white/20">
          <strong className="text-4xl">
            For now I&apos;m just a placeholder 😅
          </strong>
          <p className="text-lg">But I&apos;ll be ready soon, I promise! 🤞</p>
        </div>
      </div>
    </main>
  );
};

export default Blog;

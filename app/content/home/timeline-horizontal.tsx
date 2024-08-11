'use client';

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TimelineProps = {
  experience: {
    company: string;
    role: string;
    from: Date;
    to?: Date;
    description: string;
  }[];
};

const HorizontalTimeline: FC<TimelineProps> = ({ experience }) => {
  const [step, setStep] = useState(0);

  const olClasses = twMerge(
    'hidden lg:flex items-start px-12 py-4 transition-all',
    step === 0 && 'translate-x-0',
    step === 1 && '-translate-x-[75%]',
    step === 2 && '-translate-x-[125%]',
  );

  return (
    <div className="relative w-full overflow-hidden px-10">
      <button
        type="button"
        className="absolute left-0 top-0 z-20 w-10"
        onClick={() => setStep((prev) => Math.max(0, prev - 1))}
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="size-12 text-white transition-all hover:size-14" />
      </button>
      <div className="fadeout-horizontal">
        <ol className={olClasses}>
          {experience.map((exp) => (
            <li
              key={`${exp.from.toISOString()}-${exp.company}`}
              className="relative mb-0 min-w-96 max-w-max"
            >
              <div className="flex items-center">
                <div className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-solo">
                  <CalendarIcon className="size-3 fill-solo stroke-solo text-solo" />
                </div>
                <div className="flex h-px w-full bg-white/20" />
              </div>
              <div className="mt-3 space-y-2 pe-8 pr-10">
                <h3
                  className="font-semibold 
            lg:text-xl"
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
                <p className="text-base font-light">{exp.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <button
        type="button"
        className="absolute right-0 top-0 z-20 w-10"
        onClick={() => setStep((prev) => Math.min(2, prev + 1))}
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="size-12 text-white transition-all hover:size-14" />
      </button>
    </div>
  );
};

export default HorizontalTimeline;

'use client';

import { CoffeeIcon } from 'app/components/icons';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { PopupModal } from 'react-calendly';

const Calendar = () => {
  const t = useTranslations('Homepage.Contact');
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute z-20 -mt-20 w-full">
      <div
        className="neon-border mx-auto flex w-10/12 flex-col items-center justify-center gap-4 rounded bg-primary p-8 text-center shadow
      lg:flex-row lg:justify-around"
      >
        <h2
          className="text-xl
      lg:text-2xl"
        >
          {t('Title')}{' '}
          <span className="solo-gradient">
            <strong>{t('Gradient')}</strong>
          </span>
        </h2>
        <p className="text-sm md:text-base">{t('Subtitle')}</p>
        <div ref={root} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group  inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-primary
          transition-all hover:scale-110 hover:bg-solo hover:text-white
          lg:text-lg"
        >
          <CoffeeIcon className="inline-block size-6" />
          {t('Button')}
        </button>
        {typeof window !== 'undefined' ? (
          <PopupModal
            url="https://calendly.com/wmoralesdev/chat-with-me"
            rootElement={root.current!}
            open={open}
            onModalClose={() => setOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Calendar;

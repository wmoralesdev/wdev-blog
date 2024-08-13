'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Link } from '@/navigation';
import { FC } from 'react';

const Calendar = dynamic(() => import('app/content/home/calendar'));

const Footer: FC = () => {
  const t = useTranslations('Footer');

  return (
    <div className="relative mt-20">
      <Calendar />
      <footer
        className="bg-primary/70 p-4 px-8 pt-40 text-sm backdrop-blur-lg
      lg:pt-20"
      >
        <div className="container flex flex-col gap-4">
          <div
            className="grid grid-cols-2 grid-rows-2 gap-y-10 py-4 
      md:grid-cols-3 md:grid-rows-1"
          >
            <div className="flex flex-col items-start justify-start gap-4">
              <h4 className="lg:text-base">{t('Socials')}</h4>
              <ul
                className="space-y-2 text-xs font-light text-white/50
          lg:text-sm"
              >
                <li className="transition-all hover:text-white">
                  <a
                    href="https://www.linkedin.com/in/wmoralesdev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="transition-all hover:text-white">
                  <a
                    href="https://www.instagram.com/wmoralesdev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li className="transition-all hover:text-white">
                  <a
                    href="https://github.com/wmoralesdev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start gap-4">
              <h4 className="lg:text-base">{t('Resources.Title')}</h4>
              <ul
                className="space-y-2 text-xs font-light text-white/50
          lg:text-sm"
              >
                <li className="transition-all hover:text-white">
                  <a
                    href="https://github.com/wmoralesdev/wdev-blog"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('Resources.Source')}
                  </a>
                </li>
                <li className="transition-all hover:text-white">
                  <a
                    href="https://github.com/shuding/cobe"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Globe (Cobe)
                  </a>
                </li>
                <li className="transition-all hover:text-white">
                  <a
                    href="https://dribbble.com/shots/23717022-Brooks-Website-Designer-Portfolio-Website"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('Resources.DesignInspo')}
                  </a>
                </li>
                <li className="transition-all hover:text-white">
                  <a
                    href="https://leerob.io/blog"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('Resources.FeaturesInspo')}
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="col-span-2 flex flex-col items-start justify-start gap-4
        lg:col-span-1"
            >
              <h4 className="lg:text-base">{t('Contact')}</h4>
              <ul
                className="space-y-2 text-xs font-light text-white/50
          lg:text-sm"
              >
                <li className="transition-all hover:text-white">
                  <Link href="mailto:walterrafael26@gmail.com">
                    walterrafael26@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p
            className="text-center text-xs text-white/40
      lg:text-sm"
          >
            Copyright &copy; {new Date().getFullYear()} Walter Morales
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const locales = ['en', 'de'];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

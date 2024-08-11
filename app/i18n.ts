import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  console.log(`Loading messages for locale: ${locale}`);

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

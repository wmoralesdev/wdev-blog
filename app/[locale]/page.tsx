import { FC } from 'react';
import { Hero, About, Stack, Timeline } from 'app/content/home';
import { Section } from 'app/components/layout';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const Home: FC = async () => {
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider session={session}>
      <main className="container flex flex-col">
        <Hero />
        <Section small className="flex flex-col items-center justify-between">
          <About />
          <Stack />
        </Section>
        <Timeline />
      </main>
    </SessionProvider>
  );
};

export default Home;

import { FC } from 'react';
import { Hero, About, Stack, Timeline } from 'app/content/home';
import { Section } from 'app/components/layout';

const Home: FC = () => {
  return (
    <main className="container flex flex-col">
      <Hero />
      <Section small className="flex flex-col items-center justify-between">
        <About />
        <Stack />
      </Section>
      <Timeline />
    </main>
  );
};

export default Home;

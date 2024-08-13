import { Section } from '@/components/layout';
import { FC } from 'react';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Form from './form';
import Hero from './hero';

const getSignatures = async () => {
  const signatures = await prisma.guestbook.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      upVotes: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { signatures, count: signatures.length };
};

const Guestbook: FC = async () => {
  const { count, signatures } = await getSignatures();
  const session = await auth();

  return (
    <main className="container flex flex-col pb-20">
      <Section small className="flex flex-col gap-8">
        <Hero count={count} />
        <Form user={session?.user} signatures={signatures} />
      </Section>
    </main>
  );
};

export default Guestbook;
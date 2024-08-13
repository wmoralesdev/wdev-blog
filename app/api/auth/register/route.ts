import prisma from '@lib/prisma';
import { NextRequest } from 'next/server';
import { CreateUserSchema } from './meta';

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const user = await CreateUserSchema.safeParseAsync(json);

  if (!user.success) {
    return new Response(JSON.stringify(user.error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const canCreate =
    (await prisma.user.findUnique({
      where: {
        email_source: { email: user.data.email, source: user.data.source },
      },
    })) == null;

  if (!canCreate) {
    return new Response(null, {
      status: 204,
    });
  }

  const createdUser = await prisma.user.create({
    data: user.data,
  });

  return new Response(JSON.stringify(createdUser), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { CreateSignatureSchema, VoteSignatureSchema } from './meta';

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const body = await CreateSignatureSchema.safeParseAsync(json);

  if (!body.success) {
    return new Response(JSON.stringify(body.error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email_source: {
        email: body.data.email,
        source: 'GOOGLE',
      },
    },
  });

  if (!user) {
    return new Response(null, {
      status: 401,
    });
  }

  const signature = await prisma.guestbook.create({
    data: {
      content: body.data.content,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    select: {
      id: true,
      content: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      createdAt: true,
      upVotes: true,
    },
  });

  return new Response(JSON.stringify(signature), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const PATCH = async (req: NextRequest) => {
  const json = await req.json();
  const body = await VoteSignatureSchema.safeParseAsync(json);

  if (!body.success) {
    return new Response(JSON.stringify(body.error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const updatedSignature = await prisma.guestbook.update({
    where: {
      id: body.data.id,
    },
    data: {
      upVotes: {
        increment: body.data.vote === 'UP' ? 1 : 0,
      },
      downVotes: {
        increment: body.data.vote === 'DOWN' ? 1 : 0,
      },
    },
  });

  return new Response(JSON.stringify(updatedSignature), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

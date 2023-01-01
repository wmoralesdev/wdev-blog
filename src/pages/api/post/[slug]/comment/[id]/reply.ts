import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';
import { getSession } from 'next-auth/react';

const handler = NextConnect()
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const id = +(req.query.id as string);
        const session = await getSession({ req });

        if (!session) return res.status(403).json({ error: 'Unauthorized' });

        const { email, image, name } = session.user;

        let author = await prisma.user.findFirst({ where: { email } });

        if (!author) author = await prisma.user.create({ data: { email, avatar: image, name } });

        const reply = await prisma.reply.create({
            data: {
                commentId: id,
                body: (req.body.body || '').slice(0, 512),
                authorId: author.email,
            },
            select: {
                id: true,
                author: true,
                body: true,
                created_at: true,
            },
        });

        return res.status(201).json(reply);
    });

export default handler;

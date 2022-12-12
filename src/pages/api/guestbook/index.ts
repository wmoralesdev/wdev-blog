import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';
import { getSession } from 'next-auth/react';

const handler = NextConnect()
    .get(async (_: NextApiRequest, res: NextApiResponse) => {
        const entries = await prisma.guestbook.findMany({
            orderBy: {
                updated_at: 'desc',
            },
            select: {
                id: true,
                author: true,
                body: true,
                created_at: true,
                updated_at: true,
            },
        });

        return res.status(200).json(entries);
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getSession({ req });

        if (!session) return res.status(403).json({ error: 'Unauthorized' });

        const { email, image, name } = session.user;

        let user = await prisma.user.findFirst({ where: { email } });

        if (!user) user = await prisma.user.create({ data: { email, avatar: image, name } });

        const newEntry = await prisma.guestbook.create({
            data: {
                body: (req.body.body || '').slice(0, 512),
                authorId: user.email,
            },
            select: {
                id: true,
                body: true,
                author: true,
                created_at: true,
                updated_at: true,
            },
        });

        return res.status(201).json(newEntry);
    });

export default handler;

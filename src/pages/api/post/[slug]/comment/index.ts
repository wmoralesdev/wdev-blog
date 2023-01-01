import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';
import { getSession } from 'next-auth/react';

const handler = NextConnect()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const slug = req.query.slug as string;

        const comments = await prisma.comment.findMany({
            where: { post: slug },
            orderBy: { created_at: 'asc' },
            select: {
                id: true,
                author: true,
                body: true,
                replies: {
                    orderBy: { created_at: 'asc' },
                    select: {
                        author: true,
                        body: true,
                        id: true,
                        created_at: true,
                    },
                },
                created_at: true,
            },
        });

        if (!comments) return res.status(404).send('Not found');

        return res.status(200).json(comments);
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const slug = req.query.slug as string;
        const session = await getSession({ req });

        if (!session) return res.status(403).json({ error: 'Unauthorized' });

        const { email, image, name } = session.user;

        let author = await prisma.user.findFirst({ where: { email } });

        if (!author) author = await prisma.user.create({ data: { email, avatar: image, name } });

        const newEntry = await prisma.comment.create({
            data: {
                body: (req.body.body || '').slice(0, 512),
                post: slug,
                authorId: author.email,
            },
            select: {
                id: true,
                author: true,
                body: true,
                created_at: true,
            },
        });

        return res.status(201).json(newEntry);
    });

export default handler;

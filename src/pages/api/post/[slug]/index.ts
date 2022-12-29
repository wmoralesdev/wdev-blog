import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';

const handler = NextConnect()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const slug = req.query.slug as string;

        const postViews = await prisma.views.upsert({
            where: { slug },
            update: {
                count: {
                    increment: 1,
                },
            },
            create: {
                slug,
                count: 1,
            },
        });

        return res.status(201).json({ views: postViews.count });
    });

export default handler;

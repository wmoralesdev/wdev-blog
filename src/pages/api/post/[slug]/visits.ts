import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';

const handler = NextConnect()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const slug = req.query.slug as string;

        const views = await prisma.view.findFirst({
            where: { slug },
        });

        if (!views) return res.status(404).send('Not found');

        return res.status(200).json({ views: views.count });
    });

export default handler;

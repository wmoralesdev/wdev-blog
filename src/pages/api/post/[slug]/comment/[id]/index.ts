import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';

const handler = NextConnect()
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        const deletedSign = await prisma.comment.delete({
            where: {
                id: +req.query.id,
            },
        });

        return res.status(201).json(deletedSign);
    });

export default handler;

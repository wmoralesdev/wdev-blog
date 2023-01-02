import NextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma-local/prisma';

const handler = NextConnect()
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        const deletedReply = await prisma.reply.delete({
            where: {
                id: +req.query.replyId,
            },
            select: { id: true, commentId: true },
        });

        return res.status(201).json(deletedReply);
    });

export default handler;

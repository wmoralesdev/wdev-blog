import useFormattedDate from '@hooks/useFormattedDate';
import { CommentModel, ReplyModel } from '@models/comment';
import { Request } from '@models/request';
import { deleteReply } from '@services/comment';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { HiTrash } from 'react-icons/hi';
import Author from './Author';

interface ReplyProps extends ReplyModel {
    commentId: string;
    slug: string;
}

interface DeleteReplyProps {
    commentId: string;
    replyId: string;
    slug: string;
    author: string;
}

const DeleteReply: FC<DeleteReplyProps> = ({
    commentId, replyId, slug: postSlug, author,
}) => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation(() => deleteReply(postSlug, commentId, replyId), {
        onSuccess: (deletedReply) => {
            queryClient.setQueryData(
                ['post-comments', postSlug],
                (oldComments: Request<CommentModel[]>) => ({
                    ...oldComments,
                    data: oldComments.data.map((item) => {
                        if (deletedReply.data.commentId !== item.id) return item;

                        return {
                            ...item,
                            replies: item.replies.filter(({ id }) => id !== deletedReply.data.id),
                        };
                    }),
                }),
            );
        },
    });

    const handleDelete = () => {
        toast.promise(mutateAsync(), {
            loading: 'Deleting...',
            success: 'Your reply was deleted',
            error: 'Something went wrong!',
        });
    };

    if (!session || session.user.email !== author) return null;

    return (
        <button
            onClick={handleDelete}
            type="button"
            className="cust-transition rounded-full bg-red-400 text-white absolute -top-2 -right-2 p-1 hover:scale-125 hover:bg-red-600"
        >
            <HiTrash />
        </button>
    );
};

const Reply: FC<ReplyProps> = ({
    author, body, created_at, commentId, id, slug,
}) => {
    const createdAt = useFormattedDate(created_at);

    return (
        <div className="relative rounded-lg bg-neutral p-2 last-of-type:mb-2">
            <DeleteReply replyId={id} commentId={commentId} slug={slug} author={author.email} />
            <div className="w-full inline-flex items-start justify-between">
                <Author {...author} />
                <span className="text-xs md:text-base">{ createdAt }</span>
            </div>
            <p className="text-sm font-light">
                { body }
            </p>
        </div>
    );
};

export default Reply;

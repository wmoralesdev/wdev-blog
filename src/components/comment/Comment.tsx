import useFormattedDate from '@hooks/useFormattedDate';
import { CommentModel } from '@models/comment';
import { Request } from '@models/request';
import { createReply, deleteComment } from '@services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { HiTrash } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Author from './Author';
import Input from './Input';
import Reply from './Reply';

interface CommentProps extends CommentModel {}

interface DeleteCommentProps {
    commentId: string;
    postSlug: string;
    author: string;
}

const DeleteComment: FC<DeleteCommentProps> = ({ commentId, postSlug, author }) => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation(() => deleteComment(postSlug, commentId), {
        onSuccess: (deletedComment) => {
            queryClient.setQueryData(
                ['post-comments', postSlug],
                (oldComments: Request<CommentModel[]>) => ({
                    ...oldComments,
                    data: oldComments.data.filter((item) => item.id !== deletedComment.data.id),
                }),
            );
        },
    });

    const handleDelete = () => {
        toast.promise(mutateAsync(), {
            loading: 'Deleting...',
            success: 'Your comment was deleted',
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

const Comment: FC<CommentProps> = ({
    id, body, author, created_at, replies,
}) => {
    const createdAt = useFormattedDate(created_at);
    const { query } = useRouter();
    const queryClient = useQueryClient();

    const onReplySuccess = (newReply: AxiosResponse<CommentModel, any>) => {
        queryClient.setQueryData(['post-comments', query.slug as string], (oldComments: Request<CommentModel[]>) => {
            if (!oldComments) return { data: [newReply.data] };

            return {
                ...oldComments,
                data: oldComments.data.map((comment) => {
                    if (comment.id !== id) return comment;

                    return {
                        ...comment,
                        replies: [...(comment.replies ?? []), newReply.data],
                    };
                }),
            };
        });
    };

    return (
        <div className="relative rounded-lg bg-light p-2 w-full md:px-4">
            <DeleteComment commentId={id} author={author.email} postSlug={query.slug as string} />
            <div className="w-full inline-flex items-start justify-between">
                <Author {...author} />
                <span className="text-xs md:text-base">{ createdAt }</span>
            </div>
            <p className="font-light text-sm mb-2
            md:text-base"
            >
                { body }
            </p>
            {
                replies && replies.length > 0 ? (
                    <div className="ml-auto w-[90%] flex flex-col gap-2
                    md:w-[91%]"
                    >
                        { replies.map((reply) => (
                            <Reply
                                key={reply.id}
                                {...reply}
                                commentId={id}
                                slug={query.slug as string}
                            />
                        ))}
                    </div>
                ) : null
            }
            <Input
                mutationFn={(postSlug: string, data: any) => createReply(postSlug, id, data)}
                cacheModify={onReplySuccess}
                notifications={{
                    success: 'Reply added ✏️',
                    loading: 'Adding your reply...',
                    error: 'We couldn\'t add your reply 😥',
                }}
                input={{
                    placeholder: 'Add a reply...',
                    validation: {
                        required: 'You cannot add a reply without text 😒',
                        max: 'Your reply must contain 512 characters at most',
                    },
                }}
                isReply
            />
        </div>
    );
};

export default Comment;

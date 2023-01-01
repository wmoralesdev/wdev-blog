import useFormattedDate from '@hooks/useFormattedDate';
import { CommentModel } from '@models/comment';
import { Request } from '@models/request';
import { createReply } from '@services/comment';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import Author from './Author';
import Input from './Input';
import Reply from './Reply';

interface CommentProps extends CommentModel {}

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
                        replies: [...comment.replies, newReply.data],
                    };
                }),
            };
        });
    };

    return (
        <div className="rounded-lg bg-light p-2 w-full md:px-4">
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
                        { replies.map((reply) => <Reply {...reply} />)}
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

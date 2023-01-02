import React, {FC, useId} from 'react';
import { useSession, signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createComment, getComments } from '@services/comment';
import { AxiosResponse } from 'axios';
import { Request } from '@models/request';
import { CommentModel } from '@models/comment';
import Comment from './Comment';
import Input from './Input';

const Login: FC = () => (
    <button type="button" className="btn" onClick={() => signIn('github')}>
        Sign in to leave a comment or reply
        <AiFillGithub />
    </button>
);

const Container: FC = () => {
    const { query } = useRouter();
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const { data: comments } = useQuery(['post-comments', query.slug as string], () => getComments(query.slug as string), {
        refetchOnWindowFocus: false,
    });

    const onCommentSuccess = (newComment: AxiosResponse<CommentModel, any>) => {
        queryClient.setQueryData(['post-comments', query.slug as string], (oldComments: Request<CommentModel[]>) => {
            if (!oldComments) return { data: [newComment.data] };

            return {
                ...oldComments,
                data: [...oldComments.data, newComment.data],
            };
        });
    };

    return (
        <div className="mt-4 border-t border-light pt-4 w-full flex flex-col justify-center items-center gap-y-4">
            { session ? (
                <Input
                    mutationFn={createComment}
                    cacheModify={onCommentSuccess}
                    notifications={{
                        success: 'Comment added ✏️',
                        loading: 'Adding comment...',
                        error: 'We couldn\'t add your comment 😥',
                    }}
                    input={{
                        placeholder: 'Add a comment...',
                        validation: {
                            required: 'You cannot add a comment without text 😒',
                            max: 'Your comment must contain 512 characters at most',
                        },
                    }}
                />
            ) : <Login /> }
            {
                comments && comments.data && comments.data.map(
                    (comment) => <Comment key={comment.id} {...comment} />,
                )
            }
        </div>
    );
};

export default Container;

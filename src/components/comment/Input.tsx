import { ImageContainer } from '@components/utils';
import { CommentModel } from '@models/comment';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdSend } from 'react-icons/io';

interface InputProps {
    mutationFn: (path: string, params: any) => Promise<any>;
    cacheModify: (data: any) => any;
    notifications: {
        loading: string;
        success: string;
        error: string;
    };
    input: {
        validation: {
            required: string;
            max: string;
        };
        placeholder: string;
    };
    isReply?: boolean;
}

interface DefaultTextInput {
    body: string;
}

const Input: FC<InputProps> = ({
    mutationFn, cacheModify, notifications, input: { validation, placeholder }, isReply = false,
}) => {
    const { query } = useRouter();
    const { data: session } = useSession();
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (request: Pick<CommentModel, 'body'> & { authorId: string }) => mutationFn(query.slug as string, request),
        onSuccess: cacheModify,
    });

    const {
        register, handleSubmit, watch, reset,
    } = useForm<DefaultTextInput>();

    const watchBody = watch('body');

    const onSubmit = async ({ body }: DefaultTextInput) => {
        toast.promise(mutateAsync({ body, authorId: session.user.email }), notifications);

        reset();
    };

    const onInvalid = (errors: FieldErrors<DefaultTextInput>) => toast.error(errors.body.message);

    if (!session) return null;

    return (
        <div className="w-full">
            { isReply ? null : <h2 className="text-2xl mb-2 md:text-3xl"><span>Leave a comment here</span></h2> }
            <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className={classNames('bg-light w-full inline-flex items-center justify-between rounded-lg gap-2', !isReply && 'p-4', 'md:gap-4')}
            >
                <ImageContainer
                    className={classNames('border-2 border-primary rounded-full aspect-square', isReply ? 'w-10 md:w-12' : 'w-10 md:w-14')}
                    isRounded
                    src={session.user.image}
                    alt={session.user.name}
                />
                <div className="inline-flex items-center gap-2 w-full text-sm
                md:text-base"
                >
                    <input
                        {...register('body', validation)}
                        className="input w-full"
                        placeholder={placeholder}
                    />
                    <button type="submit" className="btn h-full disabled:bg-black/50" disabled={isLoading || (watchBody?.length >= 512)}>
                        <span className="text-xs">
                            {watchBody?.length ?? 0}
                            /512
                        </span>
                        <IoMdSend />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Input;

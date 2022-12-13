/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import { ImageContainer } from '@components/utils';
import { FieldErrors, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signGuestbook } from '@services/guestbook';
import { toast } from 'react-hot-toast';
import { GuestbookModel } from '@models/guestbook';
import { Request } from '@models/request';

interface GuestbookSign {
    body: string;
}

const Input: FC = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: signGuestbook,
        onSuccess: (newSign) => {
            queryClient.setQueryData(['signs'], (oldSigns: Request<GuestbookModel[]>) => {
                if (!oldSigns) return { data: [newSign.data] };

                return {
                    ...oldSigns,
                    data: [newSign.data, ...oldSigns.data],
                };
            });
        },
    });
    const {
        register, handleSubmit, watch, reset,
    } = useForm<GuestbookSign>();
    const watchBody = watch('body');

    const onSubmit = async ({ body }: GuestbookSign) => {
        toast.promise(mutateAsync({ body, authorId: session.user.email }), {
            loading: 'Saving...',
            success: 'Your sign was saved!',
            error: 'There was something wrong with your request 😥',
        });

        reset();
    };

    const onInvalid = (errors: FieldErrors<GuestbookSign>) => toast.error(errors.body.message);

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full inline-flex items-start justify-between md:gap-4">
            <ImageContainer className="w-20 h-20 border-4 border-primary rounded-full aspect-square md:w-24 md:h-24" isRounded src={session.user.image} alt={session.user.name} />
            <div className="flex flex-col items-end gap-2 w-[70%] text-base md:text-lg md:w-full">
                <input
                    {...register('body', {
                        required: 'You cannot sign with an empty message 😒',
                        max: 'Your sign must contain 512 characters at most',
                    })}
                    className="input w-full"
                    placeholder="Sign here..."
                />
                <div className="inline-flex justify-between items-center w-full">
                    <span className={classNames('rounded-full text-base py-1 px-2', watchBody?.length <= 0 ? 'text-white/60' : watchBody?.length >= 512 ? 'text-red-400' : 'text-white')}>
                        {watchBody?.length ?? 0}
                        /512
                    </span>
                    <button type="submit" className="btn" disabled={isLoading}>Sign</button>
                </div>
            </div>
        </form>
    );
};

const Login: FC = () => (
    <button type="button" className="btn" onClick={() => signIn('github')}>
        Login with GitHub
        {' '}
        <AiFillGithub className="h-6 w-6" />
    </button>
);

const Guestbook: FC = () => {
    const { data: session, status } = useSession();

    return (
        <div className="w-full rounded-lg bg-light p-8 text-lg border-primary border-4">
            <h1 className="text-2xl gradient padding md:text-3xl"><span>Sign the guestbook</span></h1>
            <h2 className="font-normal text-base md:text-lg">Share a little message with every visitor of this page!</h2>
            <div className="my-4">
                { status === 'unauthenticated' || !session ? <Login /> : <Input /> }
            </div>
            <h3 className="inline-flex gap-2 items-center font-normal text-sm md:text-base">
                <FiAlertCircle className="h-8 w-8 md:w-6 md:h-6" />
                Your information is only used to display your name, profile picture
                and reply by email
            </h3>
        </div>
    );
};

export default Guestbook;

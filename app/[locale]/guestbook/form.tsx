/* eslint-disable no-nested-ternary */

'use client';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { User } from 'next-auth';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { GoogleIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';

const AddSignatureSchema = z.object({
  content: z.string().min(1).max(125),
});

type AddSignatureInput = z.infer<typeof AddSignatureSchema>;

type Signature = {
  id: number;
  content: string;
  user: User;
  createdAt: Date;
  upVotes: number;
};

type Props = {
  user?: User;
  signatures: Signature[];
};

const Form: FC<Props> = ({ user, signatures }) => {
  const [finalSignatures, setFinalSignatures] =
    useState<Signature[]>(signatures);

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const t = useTranslations('Guestbook');
  const form = useForm<AddSignatureInput>({
    resolver: zodResolver(AddSignatureSchema),
    defaultValues: {
      content: '',
    },
  });

  const content = form.watch('content');

  const onSubmit = async (data: AddSignatureInput) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          email: user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setFinalSignatures((prev) => [
        {
          id: prev.length + 1,
          content: data.content,
          user: user as User,
          createdAt: new Date(),
          upVotes: 0,
        },
        ...prev,
      ]);

      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const userName = user?.name?.split(' ').splice(0, 1).join(' ');

  return (
    <div className="flex flex-col gap-10">
      {!user ? (
        <div>
          <button
            type="button"
            onClick={() => signIn('google')}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white p-4 font-bold 
            text-primary transition-all hover:bg-solo hover:text-white
            lg:text-lg"
          >
            {t('Form.SignIn')}
            <GoogleIcon
              className="size-4
            lg:size-6"
            />
          </button>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="neon-border flex w-full flex-wrap gap-4 rounded-lg bg-primary/80 p-4 
    lg:flex-nowrap lg:p-8"
        >
          {status === 'loading' ? (
            <div className="fixed left-0 top-0 z-[10000] inline-flex h-screen w-screen items-center justify-center bg-primary/80">
              <div className="neon-border relative inline-flex aspect-square size-20 animate-pulse items-center justify-center rounded-full bg-white" />
            </div>
          ) : null}
          <div
            className="relative flex w-full justify-between
          md:block md:w-auto"
          >
            <span className="absolute -inset-1">
              <GoogleIcon
                className="size-6 rounded-full border border-white/20 bg-primary p-1
              lg:size-8"
              />
            </span>
            <Image
              src={user?.image ?? ''}
              alt="User profile"
              className="rounded-full border-2 border-solo"
              width={128}
              height={128}
              quality={100}
            />
            <div className="flex flex-col items-center justify-center gap-4 md:hidden">
              <span
                className={twMerge(
                  'font-bold text-sm',
                  content.length < 100
                    ? 'text-white'
                    : content.length < 250
                      ? 'text-yellow-500'
                      : 'text-red-500',
                )}
              >
                {content.length} / 250
              </span>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-primary transition-all hover:scale-105 hover:bg-solo hover:text-white"
              >
                Submit
                <PencilSquareIcon className="size-4" />
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h3
              className="text-sm font-bold text-white
        lg:text-base"
            >
              {userName}
            </h3>
            <div className="flex flex-1 items-center justify-between gap-4">
              <textarea
                rows={3}
                placeholder={t('Form.Placeholder')}
                className="w-full rounded-lg border border-white/30 bg-white/10 p-4 text-sm font-light text-white transition-all placeholder:text-white placeholder:text-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
                {...form.register('content')}
              />
              <div className="hidden flex-col items-center justify-center gap-4 md:flex">
                <span
                  className={twMerge(
                    'font-bold text-sm',
                    content.length < 100
                      ? 'text-white'
                      : content.length < 250
                        ? 'text-yellow-500'
                        : 'text-red-500',
                  )}
                >
                  {content.length} / 250
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-primary transition-all hover:scale-105 hover:bg-solo hover:text-white"
                >
                  Submit
                  <PencilSquareIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <div
        className="grid grid-cols-1 gap-4 
      lg:grid-cols-2"
      >
        {finalSignatures.map((signature) => (
          <div
            key={signature.createdAt?.toISOString()}
            className="relative flex w-full gap-4 rounded-lg border border-white/20 bg-primary/50 p-4 shadow transition-all hover:border-solo"
          >
            <span className="absolute right-2 top-2 text-xs font-light text-gray-400">
              {signature.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            {signature.user.image ? (
              <div
                className="aspect-square size-10
              lg:size-16"
              >
                <Image
                  src={signature.user.image}
                  alt="User profile"
                  className="rounded-full border border-solo"
                  width={64}
                  height={64}
                  quality={100}
                />
              </div>
            ) : null}
            <div className="space-y-1">
              <h3 className="font-bold">
                {signature.user.name?.split(' ').splice(0, 1).join(' ')}
              </h3>
              <p className="text-sm font-light text-gray-400">
                {signature.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;

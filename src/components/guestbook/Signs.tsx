import React, { FC, useId } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSign, getSigns } from 'src/services/guestbook';
import { ImageContainer } from '@components/utils';
import { useSession } from 'next-auth/react';
import { GuestbookModel } from '@models/guestbook';
import { HiTrash } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { Request } from '@models/request';
import { idFormatter } from '@utils/id';
import { AnimatePresence, motion } from 'framer-motion';

interface SignProps {
    sign: GuestbookModel;
    index: number;
}

const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const Sign: FC<SignProps> = ({ sign, index }) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const { email } = session?.user || {};
    const { mutateAsync } = useMutation({
        mutationFn: deleteSign,
        onSuccess: (deletedSign) => {
            queryClient.setQueryData(['signs'], (oldSigns: Request<GuestbookModel[]>) => ({ ...oldSigns, data: oldSigns.data.filter((item) => item.id !== deletedSign.data.id) }));
        },
    });

    const handleDelete = () => {
        toast.promise(mutateAsync(sign.id), {
            loading: 'Deleting...',
            success: 'Your sign was deleted',
            error: 'Something went wrong!',
        });
    };

    return (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear', duration: 0.3, delay: index * 0.1 }}
            className="relative bg-light w-full flex items-start gap-2 p-2 rounded-lg
            md:gap-x-8 md:p-4"
        >
            { email === sign.author.email ? (
                <button
                    onClick={handleDelete}
                    type="button"
                    className="cust-transition rounded-full bg-red-400 text-white absolute -top-2 -right-2 p-1 hover:scale-125 hover:bg-red-600"
                >
                    <HiTrash />
                </button>
            ) : null}
            <ImageContainer
                src={sign.author.avatar}
                alt={sign.author.name}
                className="w-12 h-12 rounded-full border-2 border-primary
                md:w-20 md:h-20 md:border-4"
                isRounded
            />
            <div className="flex flex-col">
                <h1 className="font-medium text-lg gradient padding md:text-xl">
                    <span>{sign.author.name}</span>
                    /
                    <i className="font-normal ml-1 text-sm md:text-base">
                        {new Date(sign.created_at).toLocaleDateString('en-US', {
                            day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                    </i>
                </h1>
                <p className="md:text-lg">
                    {sign.body}
                </p>
            </div>
        </motion.div>
    );
};

const Signs: FC = () => {
    const id = useId();
    const { data: res } = useQuery(['signs'], getSigns, {
        refetchOnWindowFocus: false,
    });

    return (
        <div className="mt-10 flex flex-col justify-start items-start gap-y-4">
            <AnimatePresence>
                {
                    res && res.data && res.data.length > 0 ? (
                        res.data.map((sign, index) => (
                            <Sign sign={sign} key={idFormatter(id, index)} index={index} />
                        ))
                    ) : null
                }
            </AnimatePresence>
        </div>
    );
};

export default Signs;

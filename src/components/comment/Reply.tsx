import useFormattedDate from '@hooks/useFormattedDate';
import { ReplyModel } from '@models/comment';
import React, { FC } from 'react';
import Author from './Author';

interface ReplyProps extends ReplyModel {}

const Reply: FC<ReplyProps> = ({
    id, author, body, created_at,
}) => {
    const createdAt = useFormattedDate(created_at);

    return (
        <div className="rounded-lg bg-neutral p-2 last-of-type:mb-2">
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

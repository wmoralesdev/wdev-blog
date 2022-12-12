import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSigns } from 'src/services/guestbook';
import { ImageContainer } from '@components/utils';

interface SignProps {
    sign: any;
}

const Sign: FC<SignProps> = ({ sign }) => (
    <div className="bg-light w-full border-b flex items-start gap-2 p-2 rounded-lg
    md:gap-x-8"
    >
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
    </div>
);

const Signs: FC = () => {
    const { data: res } = useQuery(['get-signs'], getSigns);

    return (
        <div className="mt-10 flex flex-col justify-start items-start gap-y-4">
            {
                res && res.data && res.data.length > 0 ? (
                    res.data.map((sign) => <Sign sign={sign} />)
                ) : null
            }
        </div>
    );
};

export default Signs;

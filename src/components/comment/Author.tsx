import { ImageContainer } from '@components/utils';
import { UserModel } from '@models/user';
import React, { FC } from 'react';

interface AuthorProps extends UserModel {}

const Author: FC<AuthorProps> = ({ avatar, name }) => (
    <div className="inline-flex gap-2 items-end">
        <ImageContainer
            isRounded
            className="w-10 aspect-square border-2 border-primary rounded-full md:w-12"
            src={avatar}
            alt={name}
        />
        <div className="gradient padding text-white mb-1 md:text-xl md:font-medium"><span>Walter Morales</span></div>
    </div>
);

export default Author;

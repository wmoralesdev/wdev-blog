import React, { FC } from 'react';
import { ImageContainer } from '@components/utils';

const Me: FC = () => (
    <header className="w-full flex flex-col-reverse justify-between items-start gap-y-4
    md:flex-row md:gap-0"
    >
        <div className="flex flex-col
        md:pr-12"
        >
            <h1 className="gradient padding text-6xl mb-1"><span>Walter Morales</span></h1>
            <h2 className="font-medium text-2xl mb-3">FullStack JS & .NET Developer</h2>
            <h3 className="font-normal text-lg">Building next gen web applications using a little bit of everything. Never stopped learning and never will!</h3>
        </div>
        <ImageContainer src="/img/profile.jpg" alt="Walter" isRounded className="aspect-square w-32 h-32 rounded-full border-4 border-primary md:w-36 md:h-36 lg:w-40 lg:h-40" />
    </header>
);

export default Me;

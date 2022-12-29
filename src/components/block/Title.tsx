/* eslint-disable indent */
import React, { FC, PropsWithChildren } from 'react';

interface TitleProps extends PropsWithChildren {
    style: string;
}

const TitleH1: FC<PropsWithChildren> = ({ children }) => (
    <h1 className="gradient padding text-3xl md:text-5xl"><span>{ children }</span></h1>
);

const TitleH2: FC<PropsWithChildren> = ({ children }) => (
    <h2 className="gradient padding text-2xl md:text-4xl"><span>{ children }</span></h2>
);

const TitleH3: FC<PropsWithChildren> = ({ children }) => (
    <h3 className="gradient padding text-xl md:text-3xl"><span>{ children }</span></h3>
);

const TitleH4: FC<PropsWithChildren> = ({ children }) => (
    <h4 className="gradient padding text-lg md:text-2xl"><span>{ children }</span></h4>
);

const Title: FC<TitleProps> = ({ children, style }) => {
    switch (style) {
        case 'h1':
            return <TitleH1>{ children }</TitleH1>;
        case 'h2':
            return <TitleH2>{ children }</TitleH2>;
        case 'h3':
            return <TitleH3>{ children }</TitleH3>;
        case 'h4':
            return <TitleH4>{ children }</TitleH4>;
        default:
            return null;
    }
};

export default Title;

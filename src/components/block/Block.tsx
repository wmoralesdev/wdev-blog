/* eslint-disable indent */
import { ImageContainer } from '@components/utils';
import { BlockContentModel } from '@models/common';
import React, { FC } from 'react';
import Code from './Code';
import Title from './Title';

interface BlockProps {
    body: BlockContentModel[];
}

const Block: FC<BlockProps> = ({ body }) => (
    <>
        {
            body.map((block) => {
                switch (block._type) {
                    case 'block':
                        switch (block.style) {
                            case 'h1':
                            case 'h2':
                            case 'h3':
                            case 'h4':
                                return (
                                    block.children.map(
                                        (child) => <Title style={block.style}>{child.text}</Title>,
                                    )
                                );
                            default:
                                return (
                                    block.children.filter((child) => child.text !== '').map((child) => <p className="md:text-xl">{ child.text }</p>)
                                );
                        }
                    case 'code':
                        return <Code code={block} />;
                    case 'image':
                        return <ImageContainer src={block.url} alt={block._type} className="aspect-video w-full my-2" />;
                    default: return null;
                }
            })
        }
    </>
);

export default Block;

/* eslint-disable indent */
import { ImageContainer } from '@components/utils';
import { BlockContentModel } from '@models/common';
import React, { FC, useId } from 'react';
import Code from './Code';
import Title from './Title';

interface BlockProps {
    body: BlockContentModel[];
}

const Block: FC<BlockProps> = ({ body }) => {
    const blockId = useId();

    return (
        <>
            {
                body.map((block, index) => {
                    switch (block._type) {
                        case 'block':
                            switch (block.style) {
                                case 'h1':
                                case 'h2':
                                case 'h3':
                                case 'h4':
                                    return (
                                        block.children.map(
                                            (child) => (
                                                <Title
                                                    key={`${blockId}-${index}`}
                                                    style={block.style}
                                                >
                                                    {child.text}
                                                </Title>
                                            ),
                                        )
                                    );
                                default:
                                    return (
                                        block.children.filter((child) => child.text !== '').map((child, childIdx) => <p key={`${blockId}-${index}-${childIdx}`} className="md:text-xl">{ child.text }</p>)
                                    );
                            }
                        case 'code':
                            return <Code key={`${blockId}-${index}`} code={block} />;
                        case 'image':
                            return <ImageContainer key={`${blockId}-${index}`} src={block.url} alt={block._type} className="aspect-video w-full my-2" />;
                        default: return null;
                    }
                })
            }
        </>
    );
};

export default Block;

import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

export interface ImageContainerProps {
    src: string | StaticImageData;
    alt: string;
    isRounded?: boolean;
    className?: string;
}

const ImageContainer: FC<ImageContainerProps> = ({
    src, alt, className, isRounded = false,
}) => (
    <div className={classNames('relative object-cover', className)}>
        <Image fill src={src} alt={alt} className={isRounded ? 'rounded-full' : ''} />
    </div>
);

export default ImageContainer;

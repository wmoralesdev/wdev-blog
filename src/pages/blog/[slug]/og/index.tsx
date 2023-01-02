/* eslint-disable react/no-unknown-property */
import React from 'react';
import { PostModel } from '@models/post';
import client from '@sanity-local/client';
import { postBySlugQuery } from '@sanity-local/queries';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const slug = searchParams.get('slug');
    const post = await client.fetch<PostModel>(postBySlugQuery, { slug });

    return new ImageResponse(
        (
            <div tw="bg-light w-full h-full p-12 flex flex-col">
                <img
                    tw="items-end self-end"
                    width="256"
                    height="256"
                    alt={slug}
                    src={post.miniatureImage}
                />
            </div>
        ), {
            width: 1200,
            height: 630,
        },
    );
}

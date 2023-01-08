/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/react-in-jsx-scope */
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

const key = crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(process.env.OG_SECRET),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
);

function toHex(arrayBuffer: ArrayBuffer) {
    return Array.prototype.map
        .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
        .join('');
}

export default async function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl;

    const title = searchParams.get('title');
    const token = searchParams.get('token');

    const verifyToken = toHex(
        await crypto.subtle.sign(
            'HMAC',
            await key,
            new TextEncoder().encode(JSON.stringify({ id: title })),
        ),
    );

    if (token !== verifyToken) return new Response('Invalid Token', { status: 401 });

    return new ImageResponse(
        (
            <div tw="relative p-4 flex">
                <img src="../../../assets/logo.white.svg" style={{ width: 128 }} tw="aspect-square absolute left-0 top-0" />
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}

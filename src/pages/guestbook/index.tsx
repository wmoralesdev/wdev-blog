import React from 'react';
import { Layout } from '@components/layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { GuestbookPageContent } from '@components/content';

const GuestbookPage: NextPage = () => (
    <Layout>
        <Head>
            <title>wmoralesdev - Guestbook</title>
            <meta name="description" content="You can leave a message here for me and future visitors!" />
            <meta name="keywords" content="wmorales, dev, reactjs, nodejs, guestbook, sign" />
            <meta name="author" content="Walter Morales" />
        </Head>
        <GuestbookPageContent />
    </Layout>
);

export default GuestbookPage;

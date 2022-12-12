import React from 'react';
import { Layout } from '@components/layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { GuestbookPageContent } from '@components/content';

const GuestbookPage: NextPage = () => (
    <Layout>
        <Head>
            <title>Guestbook</title>
        </Head>
        <GuestbookPageContent />
    </Layout>
);

export default GuestbookPage;

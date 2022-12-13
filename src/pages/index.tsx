import React from 'react';
import { NextPage } from 'next';
import { Layout } from '@components/layout';
import Head from 'next/head';
import { InitialPageContent } from '@components/content';
import client from '@sanity-local/client';
import { postQuery } from '@sanity-local/queries';

const InitialPage: NextPage = () => (
    <Layout>
        <Head>
            <title>Home</title>
        </Head>
        <InitialPageContent />
    </Layout>
);

export async function getStaticProps() {
    const posts = await client.fetch(postQuery);

    return { props: { posts } };
}

export default InitialPage;

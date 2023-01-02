import React from 'react';
import { NextPage } from 'next';
import { Layout } from '@components/layout';
import Head from 'next/head';
import { InitialPageContent } from '@components/content';
import client from '@sanity-local/client';
import { threeTopPostsQuery } from '@sanity-local/queries';
import { PostModel } from '@models/post';

interface InitialPageProps {
    posts: PostModel[];
}

const InitialPage: NextPage<InitialPageProps> = ({ posts }) => (
    <Layout>
        <Head>
            <title>wmoralesdev - Home</title>
            <meta name="description" content="FullStack JS & .NET Developer, building next gen web applications using a little bit of everything. Never stopped learning and never will!" />
            <meta name="keywords" content="wmorales, dev, reactjs, nodejs, .net" />
            <meta name="author" content="Walter Morales" />
        </Head>
        <InitialPageContent posts={posts} />
    </Layout>
);

export async function getStaticProps() {
    const posts = await client.fetch<PostModel[]>(threeTopPostsQuery);

    return { props: { posts } };
}

export default InitialPage;

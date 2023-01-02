import React from 'react';
import { Layout } from '@components/layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { BlogPageContent } from '@components/content';
import client from '@sanity-local/client';
import { mostRecentPostsQuery } from '@sanity-local/queries';
import { PostModel } from '@models/post';

interface BlogPageProps {
    posts: PostModel[];
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => (
    <Layout>
        <Head>
            <title>wmoralesdev - Blog</title>
            <meta name="description" content="Want to know tips and tutorials about web topics? Here's the place for that, look at all my blog entries maybe something helps you out!" />
            <meta name="keywords" content="wmorales, dev, blog" />
            <meta name="author" content="Walter Morales" />
        </Head>
        <BlogPageContent posts={posts} />
    </Layout>
);

export async function getServerSideProps() {
    const mostRecent = await client.fetch<PostModel[]>(mostRecentPostsQuery);

    return {
        props: {
            posts: mostRecent,
        },
    };
}

export default BlogPage;

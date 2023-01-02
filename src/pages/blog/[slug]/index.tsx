import React from 'react';
import { Layout } from '@components/layout';
import { NextPage, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import client from '@sanity-local/client';
import { postBySlugQuery, postsSlugs } from '@sanity-local/queries';
import { PostModel } from '@models/post';
import { ImageContainer } from '@components/utils';
import { Block } from '@components/block';
import { useQuery } from '@tanstack/react-query';
import { trackPostVisit } from '@services/tracking';
import { HiEye } from 'react-icons/hi';
import { Container } from '@components/comment';

interface BlogPostPageProps {
    post: PostModel;
}

const BlogPostPage: NextPage<BlogPostPageProps> = (
    {
        post: {
            slug, title, author, categories, ...post
        },
    },
) => {
    const { data: res } = useQuery(['visit-post', slug.current], () => trackPostVisit(slug.current), {
        refetchOnWindowFocus: false,
    });

    return (
        <Layout>
            <Head>
                <title>{ title }</title>
                <meta
                    property="og:image"
                    content={post.metaImage}
                />
            </Head>
            <div className="max-w-screen-md w-screen text-left px-4 flex flex-col gap-y-4">
                <h1 className="gradient padding text-3xl md:text-5xl"><span>{ title }</span></h1>
                <div className="w-full flex flex-wrap justify-between">
                    <div className="w-1/2 inline-flex items-center gap-2">
                        <ImageContainer src={author.image} alt={author.name} className="rounded-full border-2 border-primary w-12 aspect-square md:w-14" isRounded />
                        <h3 className="text-2xl mt-auto font-medium">{author.name}</h3>
                    </div>
                    <div className="ml-auto flex items-center justify-center">
                        <span className="hidden
                        md:inline-flex md:items-center md:justify-center md:gap-1 md:mx-4"
                        >
                            <HiEye />
                            { res?.data?.views ?? '' }
                        </span>
                        { categories.map((cat) => <span className="ext-sm bg-primary rounded-full px-2 py-1">{cat.title}</span>) }
                    </div>
                </div>
                <ImageContainer src={post.coverImage} alt="alt" className="w-full aspect-video bg-red-200" />
                <hr className="border-primary border-t-2" />
                <div className="w-full flex flex-col gap-4">
                    <Block body={post.body} />
                </div>
                <Container />
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const slugs = await client.fetch(postsSlugs);

    return { paths: slugs.map(({ slug }) => ({ params: { slug } })), fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const { slug } = params;
    const post = await client.fetch<PostModel>(postBySlugQuery, { slug });

    return {
        props: {
            post,
        },
    };
}

export default BlogPostPage;

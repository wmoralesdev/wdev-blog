import { PostModel } from '@models/post';
import { getPostVisits } from '@services/post';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { FC, useId } from 'react';
import { BsEye } from 'react-icons/bs';

interface SummaryProps {
    posts: PostModel[];
}

const PostCard: FC<{ post: PostModel }> = ({ post }) => {
    const { data: res } = useQuery(['visit-post', post.slug.current], () => getPostVisits(post.slug.current), {
        refetchOnWindowFocus: false,
    });

    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className="aspect-square relative rounded-lg border-4 border-primary p-4 bg-light h-60 flex flex-col justify-end text-right cust-transition group
            bg-cover
            hover:border-white
            hover:scale-105"
            style={{ backgroundImage: `url(${post.miniatureImage})` }}
        >
            <div className="absolute z-0 top-0 left-0 rounded bg-black w-full h-full opacity-80 cust-transition" />
            <div className="absolute z-0 bottom-0 left-0 rounded w-0 h-0 bg-primary cust-transition group-hover:w-full group-hover:h-full" />
            <span className="absolute top-0 right-0 mr-2 mt-2 inline-flex gap-2 z-10 py-1 px-2 rounded-full cust-transition">
                { res?.data?.views ?? '' }
                <BsEye className="h-6 w-6" />
            </span>
            <h1 className="relative z-10 gradient padding text-xl md:text-2xl group-hover:gradient-inverted"><span>{post.title}</span></h1>
        </Link>
    );
};

const Summary: FC<SummaryProps> = ({ posts }) => {
    const id = useId();

    return (
        <div className="w-full flex flex-col mt-10 gap-8">
            <h1 className="text-2xl gradient padding md:text-3xl"><span>Most recent posts</span></h1>
            <div>
                {posts.map((post, index) => <PostCard key={`${id}-${index}`} post={post} />)}
            </div>
        </div>
    );
};

export default Summary;

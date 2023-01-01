import { PostModel } from '@models/post';
import client from '@sanity-local/client';
import { postsByTitleQuery } from '@sanity-local/queries';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';

interface BlogPageProps {
    posts: PostModel[];
}

interface PostFilter {
    query: string;
}

interface PostPreviewProps {
    post: PostModel;
}

const PostPreview: FC<PostPreviewProps> = ({ post }) => (
    <a
        href="/"
        className="w-full aspect-video relative rounded-lg border-4 border-primary bg-cover bg-top cust-transition
        md:w-1/2 hover:scale-105"
        style={{ backgroundImage: `url(${post.coverImage})` }}
    >
        <div className="absolute z-0 bg-black w-full h-full top-0 left-0 rounded bg-opacity-90" />
        <div className="relative z-10 w-full h-full p-2 flex flex-col justify-end items-end">
            <h1 className="gradient padding text-2xl text-right"><span>{ post.title }</span></h1>
        </div>
    </a>
);

const BlogPage: FC<BlogPageProps> = ({ posts }) => {
    const [display, setDisplay] = useState(posts);
    const { mutateAsync, isLoading } = useMutation(
        (title: string) => client.fetch(postsByTitleQuery, { title }),
    );

    const { register, handleSubmit, getValues } = useForm<PostFilter>({
        defaultValues: { query: '' },
    });

    const onSearch = async ({ query }: PostFilter) => {
        const results = await mutateAsync(query);
        setDisplay(results);
    };

    return (
        <div className="w-screen max-w-screen-md px-4">
            <h1 className="gradient padding text-4xl mb-1"><span>Let&apos;s look at my posts</span></h1>
            <form onSubmit={handleSubmit(onSearch)} className="w-full inline-flex items-center gap-2 mt-2 pb-8">
                <input
                    {...register('query', { onChange: (e) => e.target.value === '' && setDisplay(posts) })}
                    disabled={isLoading}
                    className="w-full h-full input bg-transparent outline-none"
                />
                <button type="submit" className="inline-flex gap-2 btn">
                    <FiSearch className="h-5 w-5" />
                    Search
                </button>
            </form>
            <div className="w-full flex gap-4 justify-between items-center">
                { display && display.length > 0 ? display.map(
                    (post) => <PostPreview post={post} />,
                ) : (
                    <div>
                        <h1 className="text-2xl">
                            There&apos;s no results for
                            {' '}
                            <span>
                                &quot;
                                {getValues('query')}
                                &quot;
                            </span>
                        </h1>
                    </div>
                ) }
            </div>
        </div>
    );
};

export default BlogPage;

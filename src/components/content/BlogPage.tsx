import { PostModel } from '@models/post';
import React, { FC } from 'react';
import { FiSearch } from 'react-icons/fi';

interface BlogPageProps {
    posts: PostModel[];
}

const BlogPage: FC<BlogPageProps> = ({ posts }) => {
    console.log(posts);

    return (
        <div className="w-screen max-w-screen-md px-4">
            <h1 className="gradient padding text-4xl mb-1"><span>Let&apos;s look at my posts</span></h1>
            <div className="w-full inline-flex input items-center gap-2 mt-2">
                <input className="w-full bg-transparent outline-none" />
                <FiSearch className="h-5 w-5" />
            </div>
        </div>
    );
};

export default BlogPage;

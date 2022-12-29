import React, { FC } from 'react';
import { BlogSummary } from '@components/blog';
import { Me } from '@components/info';
import { PostModel } from '@models/post';

interface InitialPageProps {
    posts: PostModel[];
}

const InitialPage: FC<InitialPageProps> = ({ posts }) => (
    <>
        <Me />
        <BlogSummary posts={posts} />
    </>
);

export default InitialPage;

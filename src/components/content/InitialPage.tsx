import React, { FC } from 'react';
import { BlogSummary } from '@components/blog';
import { Me } from '@components/info';

const InitialPage: FC = () => (
    <>
        <Me />
        <BlogSummary />
    </>
);

export default InitialPage;

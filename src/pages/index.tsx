import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Me } from '@components/info';
import { Layout } from '@components/layout';
import Head from 'next/head';
import { toast } from 'react-hot-toast';

const InitialPage: NextPage = () => {
    useEffect(() => {
        toast.success('ola');
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout>
                <Me />
            </Layout>
        </>
    );
};

export default InitialPage;

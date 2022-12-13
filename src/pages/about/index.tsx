import React from 'react';
import { AboutPageContent } from '@components/content';
import { Layout } from '@components/layout';
import { NextPage } from 'next';
import Head from 'next/head';
import client from '@sanity-local/client';
import { experienceQuery } from '@sanity-local/queries';
import { ExperienceModel } from '@models/experience';

export interface AboutPageProps {
    experience: ExperienceModel[];
}

const AboutPage: NextPage<AboutPageProps> = ({ experience }) => (
    <Layout>
        <Head>
            <title>About me</title>
        </Head>
        <AboutPageContent experience={experience} />
    </Layout>
);

export async function getStaticProps() {
    const experience = await client.fetch<ExperienceModel[]>(experienceQuery);

    return { props: { experience } };
}

export default AboutPage;

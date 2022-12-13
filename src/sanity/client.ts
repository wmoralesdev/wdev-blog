import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: 'pzewtt4f',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2021-10-21',
});

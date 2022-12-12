import '../styles/globals.css';

import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <Head>
                <link rel="icon" href="/logo.white.svg" />
            </Head>
            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => typeof window !== 'undefined' && window.scrollTo(0, 0)}
            >
                <SessionProvider session={session}>
                    <QueryClientProvider client={queryClient}>
                        <Hydrate state={pageProps.dehydratedState}>
                            <Component {...pageProps} />
                        </Hydrate>
                    </QueryClientProvider>
                </SessionProvider>
            </AnimatePresence>
        </>
    );
};

export default appWithTranslation(MyApp);

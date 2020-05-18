import React from 'react';
import Head from 'next/head';

import PageLayout from './PageLayout';

export default function Address() {

    return (
        <>
            <Head>
                <title>Seleção de endereço</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    TESTE

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                }
            `}</style>
        </>
    );
}

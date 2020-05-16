import React from 'react';
import Head from 'next/head';

import PageLayout from '../components/PageLayout';

export default function Page404() {

    return (
        <>
            <Head>
                <title>404 - Não Encontrado</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    <p>Página não encontrada</p>

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    height: 600px;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }    

                p {
                    font-size: 50px;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}
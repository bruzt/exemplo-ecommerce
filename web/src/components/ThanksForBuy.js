import React from 'react';
import Head from 'next/head';

import PageLayout from './PageLayout';

export default function ThanksForBuy() {

    return (
        <>
            <Head>
                <title>Obrigado pela compra</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    <h2>Obrigado pela compra, seu pedido será processado e qualquer alteração será informada por email</h2>

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    padding: 20px 0;
                    min-height: 500px;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                h2 {
                    text-align: center;
                }
            `}</style>
        </>
    );
}

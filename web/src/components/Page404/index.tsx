import React from 'react';
import Head from 'next/head';

import PageLayout from '../PageLayout';

import { Container } from './styles';

export default function Page404() {

    return (
        <>
            <Head>
                <title>404 - Não Encontrado</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <Container>

                    <p>Página não encontrada</p>

                </Container>

            </PageLayout>
        </>
    );
}

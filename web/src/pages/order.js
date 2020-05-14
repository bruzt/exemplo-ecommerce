import React from 'react';
import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainLayout from '../components/MainLayout';

export default function Order() {

    return (
        <>
            <Head>
                <title>Carrinho de compras</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Header />

            <MainLayout>

                <section>

                    carrinho
                    
                </section>

            </MainLayout>

            <Footer />

            <style jsx>{`
                section {
                    min-height: 800px;
                }
            `}</style>
        </>
    );
}

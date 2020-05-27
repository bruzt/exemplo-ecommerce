import React/*, { useState, useEffect }*/ from 'react';
import Head from 'next/head'

import api from '../services/api';

import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';

export async function getStaticProps() {

    const response = await api.get('/products');

    return {
        props: { products: response.data }
    }
}

export default function Home({ products }) {

    return (
        <>
            <Head>
                <title>Exemplo E-commerce</title>
                <meta name="description" content="Exemplo de e-coomerce, página inicial"/>
                <meta name="keywords" content="exemplo, e-commerce"/>
                <meta name="author" content="Bruno Zutim" />
            </Head>

            <PageLayout>

                <section>
                    <div className="p-grid">

                        {products.map( (product) => <ProductCard product={product} key={product.id} />)}

                    </div>
                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                }

                .p-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    text-align: center;
                    padding: 20px 0;
                    grid-gap: 20px;
                }

                @media (max-width: 1200px) {
                    padding: 0;

                    .p-grid {
                        grid-template-columns: 1fr 1fr 1fr;
                        padding: 10px;
                        grid-gap: 10px;
                    }
                }

                @media (max-width: 900px) {
                    padding: 0;

                    .p-grid {
                        grid-template-columns: 1fr 1fr;
                        padding: 5px;
                        grid-gap: 5px;
                    }
                }

                @media (max-width: 600px) {
                    padding: 0;

                    .p-grid {
                        grid-template-columns: 1fr;
                        padding: 0;
                        grid-gap: 0;
                    }
                }
            `}</style>
        </>
    )
}

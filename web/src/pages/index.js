import React/*, { useState, useEffect }*/ from 'react';
import Head from 'next/head'
import Link from 'next/link';

import api from '../services/api';

import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';

export async function getStaticProps() {
//export async function getServerSideProps() {

    const onSale = await api.get('/products?section=on-sale&limit=6');
    const bestSellers = await api.get('/products?section=best-sellers&limit=6');
    const news = await api.get('/products?section=news&limit=6');

    return {
        props: { 
            onSale: onSale.data,
            bestSellers: bestSellers.data,
            news: news.data
        }
    }
}

export default function Home({ onSale, bestSellers, news }) {

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

                    {onSale.length > 0 && (
                        <>
                            <Link href='/search?section=on-sale'>
                                <a>
                                    <h3>PROMOÇÕES</h3>  
                                </a>
                            </Link>
                            <div className="p-grid">

                                {onSale.map( (product) => <ProductCard product={product} key={product.id} />)}

                            </div>
                        </>
                    )}

                    {bestSellers.length > 0 && (
                        <>
                            <Link href='/search?section=best-sellers'>
                                <a>
                                    <h3>MAIS VENDIDOS</h3>
                                </a>
                            </Link>
                            <div className="p-grid">

                                {bestSellers.map( (product) => <ProductCard product={product} key={product.id} />)}

                            </div>
                        </>
                    )}

                    {news.length > 0 && (
                        <>
                            <Link href='/search?section=news'>
                                <a>
                                    <h3>NOVIDADES</h3>
                                </a>
                            </Link>
                            <div className="p-grid">

                                {news.map( (product) => <ProductCard product={product} key={product.id} />)}

                            </div>
                        </>
                    )}
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

                h3 {
                    margin: 20px 0 0 0;
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

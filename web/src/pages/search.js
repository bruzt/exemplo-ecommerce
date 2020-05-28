import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../services/api';

import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';

export default function Search() {

    const [getProducts, setProducts] = useState([]);

    const router = useRouter();

    useEffect( () => {

        fetchProducts();

    }, [router.query.title, router.query.categoryId]);

    async function fetchProducts(){

        try {

            let response;

            if(router.query.title){
                
                response = await api.get(`/products?title=${router.query.title}`);

            } else if(router.query.categoryId){

                response = await api.get(`/products?category=${router.query.categoryId}`);
            }

            setProducts(response.data);
            
        } catch (error) {
            console.log(error);
            alert('Erro, tente de novo');
        }
    }

    return (
        <>
            <Head>
                <title>{`Pesquisa sobre ${router.query.title}`}</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>
                    <div className="p-grid">

                        {getProducts.map( (product) => <ProductCard product={product} key={product.id} />)}

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

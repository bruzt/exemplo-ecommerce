import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../services/api';

import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';

export default function Search() {

    const [getProducts, setProducts] = useState([]);
    const [getFilter, setFilter] = useState('');

    const router = useRouter();

    useEffect( () => {

        fetchProducts();

    }, [router.query, getFilter]);

    function handleChangeFilter(value){

        setFilter(value);

        router.push({
            pathname: '/search',
            query: {
                ...router.query,
                filter: value
            }
        })
    }

    async function fetchProducts(){

        try {

            let response;

            let filter = '';
            
            if(getFilter == "lowest-price") filter = '&filter=lowest-price'
            else if(getFilter == "biggest-price") filter = '&filter=biggest-price'
            
            if(router.query.title){
                
                response = await api.get(`/products?title=${router.query.title}${filter}`);

            } else if(router.query.categoryId){

                response = await api.get(`/products?category=${router.query.categoryId}${filter}`);
            }

            if(response) setProducts(response.data);
            
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

                    <div className='filter-row'>
                        <p>Filtro:&nbsp;</p>
                        <select 
                            id="filter"
                            value={getFilter}
                            onChange={(event) => handleChangeFilter(event.target.value)}
                        >
                            <option value=""></option>
                            <option value="lowest-price">Menor Preço</option>
                            <option value="biggest-price">Maior Preço</option>
                        </select>
                    </div>
                   
                    <div className="product-grid">

                        {getProducts.map( (product) => <ProductCard product={product} key={product.id} />)}

                    </div>
                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    text-align: center;
                    padding: 20px 0;
                    grid-gap: 20px;
                }

                .filter-row {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin: 20px 0 0 0;
                    font-size: 20px;
                }

                .filter-row  #filter {
                    font-size: inherit;
                    border: 0;
                    border-radius: 2px;
                }

                @media (max-width: 1200px) {
                    padding: 0;

                    .product-grid {
                        grid-template-columns: 1fr 1fr 1fr;
                        padding: 10px;
                        grid-gap: 10px;
                    }
                }

                @media (max-width: 900px) {
                    padding: 0;

                    .product-grid {
                        grid-template-columns: 1fr 1fr;
                        padding: 5px;
                        grid-gap: 5px;
                    }
                }

                @media (max-width: 600px) {
                    padding: 0;

                    .product-grid {
                        grid-template-columns: 1fr;
                        padding: 0;
                        grid-gap: 0;
                    }
                }
            `}</style>
        </>
    )
}

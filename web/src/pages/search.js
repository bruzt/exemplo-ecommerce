import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../services/api';

import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import PaginationNav from '../components/PaginationNav';

export default function Search() {

    const [getProducts, setProducts] = useState([]);
    const [getFilter, setFilter] = useState('');

    const [getTotalPages, setTotalPages] = useState(1);

    const router = useRouter();

    const currentPage = Number(router.query.page) || 1;
    const _itemsPerPage = 15;

    useEffect( () => {

        fetchProducts();

    }, [router.query]);

    async function fetchProducts(){

        try {

            let response;

            let filter = '';
            if(getFilter == "lowest-price") filter = '&filter=lowest-price';
            else if(getFilter == "biggest-price") filter = '&filter=biggest-price';

            const page = `&offset=${(currentPage - 1) * _itemsPerPage}&limit=${_itemsPerPage}`
            
            if(router.query.title){
                
                response = await api.get(`/products?title=${router.query.title}${filter}${page}`);

            } else if(router.query.categoryId){

                response = await api.get(`/products?category=${router.query.categoryId}${filter}${page}`);

            } else if(router.query.section){

                response = await api.get(`/products?section=${router.query.section}${filter}${page}`);
            }

            if(response) {

                const totalPages = (response.data.products.length < _itemsPerPage && currentPage == 1)
                    ? 1
                    : Math.ceil(response.data.count/_itemsPerPage);

                setTotalPages(totalPages);
                setProducts(response.data.products);
            }
            
        } catch (error) {
            console.log(error);
            alert('Erro, tente de novo');
        }
    }

    function handleChangeFilter(value){

        setFilter(value);

        router.push({
            pathname: '/search',
            query: {
                ...router.query,
                filter: value
            }
        });
    }

    function handlePagination(value){

        router.push({
            pathname: '/search',
            query: {
                ...router.query,
                page: value
            }
        });
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
                        <p>Filtrar por:&nbsp;</p>
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

                    <PaginationNav
                        totalPages={getTotalPages}
                        currentPage={currentPage}
                        limitPageNav={5}
                        handlePagination={handlePagination}
                    />
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

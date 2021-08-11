import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';

import api from '../../services/api';

import { Container } from './styles';

import PageLayout from '../PageLayout';
import ProductCard from '../productComponents/ProductCard';
import PaginationNav from '../PaginationNav';
import LoadingModal from '../LoadingModal';

export default function SearchPage() {

    const [getProducts, setProducts] = useState([]);
    const [getIsFetching, setIsFetching] = useState(false);

    const [getTotalPages, setTotalPages] = useState(1);

    const router = useRouter();

    const currentPage = Number(router.query.page) || 1;
    const _itemsPerPage = 16;

    useEffect( () => {
        fetchProducts();
    }, [router.query]);

    async function fetchProducts(){

        try {

            let response: AxiosResponse;

            let filter = '';
            if(router.query.filter == "lowest-price") filter = '&filter=lowest-price';
            else if(router.query.filter == "biggest-price") filter = '&filter=biggest-price';

            const page = `&offset=${(currentPage - 1) * _itemsPerPage}&limit=${_itemsPerPage}`

            setIsFetching(true);
            
            if(router.query.title){
                
                response = await api.get(`/products?title=${router.query.title}${filter}${page}`);

            } else if(router.query.categoryId){

                response = await api.get(`/products?category=${router.query.categoryId}${filter}${page}`);

            } else if(router.query.section){

                response = await api.get(`/products?section=${router.query.section}${filter}${page}`);
            }

            setIsFetching(false);

            if(response) {

                const totalPages = (response.data.products.length < _itemsPerPage && currentPage == 1)
                    ? 1
                    : Math.ceil(response.data.count/_itemsPerPage);

                setTotalPages(totalPages);
                setProducts(response.data.products);
            }
            
        } catch (error) {
            console.log(error);
            alert('Erro, tente novamente');
            setIsFetching(false);
        }
    }

    function handleChangeFilter(value: string){

        router.push({
            pathname: '/search',
            query: {
                ...router.query,
                filter: value
            }
        });
    }

    function handlePagination(value: number){

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

                <Container>

                    <div className='filter-row'>
                        <p>Filtrar por:&nbsp;</p>
                        <select 
                            id="filter"
                            data-testid="filter-select"
                            value={router.query.filter}
                            onChange={(event) => handleChangeFilter(event.target.value)}
                        >
                            <option value="">Relevância</option>
                            <option value="lowest-price">Menor Preço</option>
                            <option value="biggest-price">Maior Preço</option>
                        </select>
                    </div>

                    {getIsFetching && (
                        <LoadingModal spinnerSize='10rem' />
                    )}

                    {(getProducts.length == 0 && getIsFetching == false) && (
                        <h2 data-testid='nothing-found'>Nada encontrado</h2>
                    )}
                   
                    <div className="product-grid">

                        {getProducts.length > 0 && (
                            getProducts.map( (product) => <ProductCard product={product} key={product.id} />)
                        )}

                    </div>

                    {getTotalPages > 1 && (
                        <PaginationNav
                            totalPages={getTotalPages}
                            currentPage={currentPage}
                            limitPageNav={5}
                            handlePagination={handlePagination}
                        />
                    )}

                </Container>

            </PageLayout>
        </>
    );
}

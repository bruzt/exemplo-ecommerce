import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styled from 'styled-components';
import Link from 'next/link';

import api from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {

    const [productsState, setProducts] = useState([]);

    useEffect( () => {

        getProducts();

    }, []);

    async function getProducts(){

        try {
            
            const response = await api.get('/products');

            setProducts(response.data);
            
        } catch (error) {
            console.log(error);
            alert('Erro, tente de novo');
        }
    }

    return (
        <>
            <Head>
                <title>E-commerce</title>
                <meta name="description" content="Exemplo de e-coomerce, página inicial"/>
                <meta name="keywords" content="exemplo, e-commerce"/>
                <meta name="author" content="Bruno Zutim" />
            </Head>

            <Header />

            <Container>

                <main>
                    <div className="p-grid">

                        {productsState.map( (product) => {

                            const discount = (product.discount_percent != 0) ? product.discount_percent + '%' : null;
                            const finalPrice = (product.discount_percent != 0) ? (product.price - (product.price * (product.discount_percent/100))).toFixed(2) : product.price;

                            return (
                                <div key={product.id} className='link'>
                                    <Link href={`/product/${product.id}`}>
                                        <div className='p-card'>
                                            <div className='img-container'>
                                                <img 
                                                    src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                                                    /*src={product.images[0] && product.images[0].url} */
                                                    alt={'imagem-' + product.name.split(' ').join('-')} 
                                                />
                                            </div>
                                            <p className='title'>{product.name}</p>
                                            <div className={(product.discount_percent != 0) ? 'price-discount' : ''}>
                                                <p className='price'>{finalPrice}</p>
                                                <p className='discount'>{discount}</p>
                                            </div>
                                        </div>    
                                    </Link>
                                </div>
                            )
                        })}

                    </div>
                </main>

            </Container>

            <Footer />
        </>
    )
}

const Container = styled.div`

    main {
        width: 100%;
        max-width: 1300px;
        min-height: 800px;
        margin: 0 auto;
        border-left: 1px solid black;
        border-right: 1px solid black;
    }

    main .p-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        text-align: center;
        padding: 20px;
        grid-gap: 20px;
    }

    main .link {
        cursor: pointer;
    }

    main .p-grid .p-card {
        border: 1px solid black;
        border-radius: 5px;
        height: 300px;
        overflow: hidden;
        padding: 10px;
    }

    main .p-grid .p-card .img-container {
        width: 100%;
        height: 200px;
    }

    main .p-grid .p-card img {
        width: 100%;
        height: 100%;
    }

    main .p-grid .p-card .title {
        font-size: 25px;
        margin-top: 10px;
    }

    main .p-grid .p-card .price-discount {
        display: flex;
        justify-content: space-around;
    }

    main .p-grid .p-card .price {
        margin-top: 10px;
    }

    main .p-grid .p-card .discount {
        margin-top: 10px;
    }
`;
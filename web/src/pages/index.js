import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';

import api from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainLayout from '../components/MainLayout';

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

            <MainLayout>

                <section>
                    <div className="p-grid">

                        {productsState.map( (product) => {

                            const discount = (product.discount_percent != 0) 
                                ? '-' + product.discount_percent + '%' 
                                : null;
                            const finalPrice = (product.discount_percent != 0) 
                                ? (product.price - (product.price * (product.discount_percent/100))).toFixed(2) 
                                : Number(product.price).toFixed(2);

                            return (
                                <Link href={`/product/${product.id}`} key={product.id}>
                                    <a title={product.name}>
                                        <div className='p-card'>
                                            <div className='img-container'>
                                                <img 
                                                    src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                                                    /*src={product.images[0] && product.images[0].url} */
                                                    alt={'imagem-' + product.name.split(' ').join('-')} 
                                                />
                                            </div>
                                            <div className='title-price'>
                                                <p className='title'>{product.name}</p>
                                                <div className='price-discount'>
                                                    <p className='price'>R$ {finalPrice}</p>
                                                    {discount && <p className='discount'>{discount}</p>}
                                                </div>
                                            </div>
                                        </div>   
                                    </a>
                                </Link>
                            )
                        })}

                    </div>
                </section>

            </MainLayout>

            <Footer />

            <style jsx>{`
                section {
                    min-height: 800px;
                }

                .p-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    text-align: center;
                    padding: 20px;
                    grid-gap: 20px;
                }

                .p-grid .p-card {
                    border: 1px solid black;
                    border-radius: 5px;
                    max-height: 350px;
                    overflow: hidden;
                    padding: 10px;
                }

                .p-grid .p-card img {
                    width: 100%;
                    max-height: 200px;
                }

                .p-grid .p-card .title-price {
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .p-grid .p-card .title {
                    font-size: 15px;
                    margin-top: 10px;
                    
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }

                .p-grid .p-card .price-discount {
                    margin: 10px 0 0 0;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                .p-grid .p-card .price-discount .discount {
                    background: #41773A;
                    padding: 5px 10px;
                }

                .p-grid .p-card .price {
                    font-size: 30px;
                    font-weight: bold;
                    padding: 5px 10px;
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

import React/*, { useState, useEffect }*/ from 'react';
import Head from 'next/head'
import Link from 'next/link';

import api from '../services/api';

import PageLayout from '../components/PageLayout';

export async function getStaticProps() {

    const response = await api.get('/products');

    //const props = response.filter( (data) => data.id == params.itemId )[0];

    return {
        props: { products: response.data }
    }
}

export default function Home({ products }) {

    /*
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
    */

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

                        {products.map( (product) => {

                            const discount = (product.discount_percent != 0) 
                                ? '-' + product.discount_percent + '%' 
                                : null;
                            const finalPrice = (product.discount_percent != 0) 
                                ? (product.price - (product.price * (product.discount_percent/100))).toFixed(2) 
                                : Number(product.price).toFixed(2);

                            return (
                                <Link href='/[productId]/[productName]' as={`/${product.id}/${product.name.split(' ').join('-')}`} key={product.id}>
                                    <a title={product.name}>
                                        <div className='p-card'>
                                            <div className='img-container'>
                                                <img 
                                                    src='https://i.picsum.photos/id/892/800/400.jpg'
                                                    /*src={`https://picsum.photos/800/400`}*/
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

            </PageLayout>

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
                    border-radius: 5px;
                    max-height: 350px;
                    overflow: hidden;
                    padding: 10px;
                    background: #c9c9c9;
                }

                .p-grid .p-card img {
                    width: 100%;
                    max-width: 475px;
                    height: auto;
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

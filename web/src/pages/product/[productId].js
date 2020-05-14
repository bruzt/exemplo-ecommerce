import React, { useState } from 'react';
import Head from 'next/head';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MainLayout from '../../components/MainLayout';

export async function getStaticPaths() {

    const response = await api.get('/products');
    
    const paths = response.data.map( (data) => ({ 
        params: { 
            productId: data.id.toString(),
            //productName: data.name.split(' ').join('-')
        }}));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const response = await api.get(`/products/${params.productId}`);

    //const props = response.filter( (data) => data.id == params.itemId )[0];

    return {
        props: { product: response.data }
    }
}

export default function Product({ product }) {

    const [qtdState, setQtd] = useState(1);
    const [buyButtonDisabledState, setBuyButtonDisabled] = useState(false);

    function verifyQtd(value){

        if(value == 0 || value == null){
                
            setBuyButtonDisabled(true);
            setQtd(value);  

        } else if (value < 0){

            setBuyButtonDisabled(true);
            setQtd(0);  
    
        } else if(value > product.quantity_stock){

            setQtd(product.quantity_stock);
            setBuyButtonDisabled(false);

        } else {

            setQtd(value);
            setBuyButtonDisabled(false);
        }
    }

    return (
        <>
            <Head>
                <title>{product.name}</title>
                <meta name="description" content={product.description} />
                <meta name="keywords" content={product.category.name} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={product.description} />
                <meta name="twitter:title" content={product.name} />
                <meta name="twitter:site" content="Exemplo-ecommerce" />
                <meta name="twitter:domain" content="Exemplo-ecommerce E-Shop" />
                <meta name="twitter:image:src" content={product.images[0] && product.images[0].url} />
                <meta name="twitter:creator" content="Exemplo-ecommerce" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description} />
                <meta property="og:url" content={`http://localhost:3000/product/${product.id}`} />
                <meta property="og:site_name" content="Exemplo-ecommerce E-Shop" />
                <meta property="og:image" content={product.images[0] && product.images[0].url} />
                <meta property="article:publisher" content="http://www.facebook.com/Exemplo-ecommerce" />
                <meta property="article:tag" content="" />
                <meta property="article:section" content="Produtos" />
                <meta property="article:published_time" content={new Date()} />
            </Head>

            <Header />

            <MainLayout>

                <section>

                    <h1>{product.name}</h1>

                    <div className='img-buy'>
                        <img 
                            src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                            /*src={product.images[0] && product.images[0].url} */
                            alt={'imagem-' + product.name.split(' ').join('-')} 
                        />

                        <div className='buy'>
                            <h2>Preço</h2>
                            <p className='price'>R$ {(product.discount_percent != 0) ? (product.price - (product.price * (product.discount_percent/100))).toFixed(2) : Number(product.price).toFixed(2)}</p>
                            {(product.discount_percent != 0) && <p className='discount'>-{product.discount_percent}%</p>}
                            <p>Qtd: <input type="number" id="qtd" value={qtdState} onChange={(event) => verifyQtd(event.target.value)} /></p> 
                            <p>Disponível: {product.quantity_stock}</p>
                            <button type='button' onClick={() => {}} disabled={buyButtonDisabledState}>Adicionar ao carrinho</button>
                        </div>
                    </div>

                    <div className='description'>
                        <p>{product.description}</p>
                    </div>

                </section>
                
            </MainLayout>

            <Footer />

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 10px;
                }

                h1 {
                    text-align: center;
                }

                .img-buy {
                    display: flex;
                    flex-direction: row;
                    margin: 20px 0 0 0;
                    justify-content: space-between;
                }

                img {
                    width: 100%;
                    max-width: 800px;
                    height: 100%;
                    max-height: 400px;
                }

                .buy {
                    width: 100%;
                    height: 400px;
                    border: 1px solid black;
                    padding: 10px;
                    margin: 0 0 0 10px;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                }

                .buy .price {
                    font-size: 30px;
                    font-weight: bold;
                }

                .buy .discount {
                    background: #41773A;
                    padding: 10px 20px;
                }

                .buy #qtd {
                    width: 45px;
                    height: 30px;
                    font-size: 20px;
                }

                .buy button {
                    background: ${(buyButtonDisabledState) ? '#a32e39' : '#3E8C34'};
                    width: 100%;
                    height: 50px;
                    border: 0;
                    cursor: pointer;
                    font-size: 20px;
                    font-weight: bold;
                }

                .buy button:hover {
                    background:${(buyButtonDisabledState) ? '#bf2232' : '#41A933'};
                }

                .description {
                    border: 1px solid black;
                    margin: 10px 0 10px 0;
                    text-align: center;
                }

                @media (max-width: 1285px) {
                    padding: 0;

                    .img-buy {
                        flex-direction: column;
                        align-items: center;
                    }
                }

                @media (max-width: 800px) {

                    .buy {
                        margin: 0;
                    }
                }
            `}</style>
        </>
    );
}

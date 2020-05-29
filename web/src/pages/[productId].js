import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../services/api';
import { useCart } from '../context/cartContext';

import PageLayout from '../components/PageLayout';

export async function getStaticPaths() {

    const response = await api.get('/products');
    
    const paths = response.data.map( (data) => ({ 
        params: { 
            productId: data.id.toString(),
            //productName: data.title.split(' ').join('-')
        }}));
        
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const response = await api.get(`/products/${params.productId}`);

    return {
        props: { product: response.data }
    }
}

export default function Product({ product }) {

    const [qtdState, setQtd] = useState(1);
    const [buyButtonDisabledState, setBuyButtonDisabled] = useState(false);
    const [productState, setProduct] = useState({});

    const cartContext = useCart();
    const router = useRouter();

    const finalPrice = (productState.discount_percent == 0) 
        ? Number(productState.price).toFixed(2)
        : (productState.price - (productState.price * (productState.discount_percent/100))).toFixed(2);

    useEffect( () => {

        getProduct();

    }, []);

    useEffect( () => {

        if(productState.quantity_stock == 0){

            setBuyButtonDisabled(true);
            setQtd(0);
        }

    }, [productState]);

    async function getProduct(){

        try {

            const response = await api.get(`/products/${product.id}`);

            setProduct(response.data);
            
        } catch (error) {
            console.error(error);
            alert('Erro, recarregue a página');
        }
    }

    function verifyQtd(value){

        if(productState.quantity_stock > 0){

            if(value == 0 || value == null){
                    
                setBuyButtonDisabled(true);
                setQtd(value);  
    
            } else if (value < 0){
    
                setBuyButtonDisabled(true);
                setQtd(0);  
        
            } else if(value > productState.quantity_stock){
    
                setQtd(productState.quantity_stock);
                setBuyButtonDisabled(false);
    
            } else {
    
                setQtd(value);
                setBuyButtonDisabled(false);
            }

        }
    }

    function addToCartButton(){

        cartContext.addToCart({ id: productState.id, qtd: qtdState });
        
        router.push('/order');
    }

    return (
        <>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description} />
                <meta name="keywords" content={product.category.title} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={product.description} />
                <meta name="twitter:title" content={product.title} />
                <meta name="twitter:site" content="Exemplo-ecommerce" />
                <meta name="twitter:domain" content="Exemplo-ecommerce E-Shop" />
                <meta name="twitter:image:src" content={product.images[0] && product.images[0].url} />
                <meta name="twitter:creator" content="Exemplo-ecommerce" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={product.description} />
                <meta property="og:url" content={`http://localhost:3000/product/${product.id}`} />
                <meta property="og:site_name" content="Exemplo-ecommerce E-Shop" />
                <meta property="og:image" content={product.images[0] && product.images[0].url} />
                <meta property="article:publisher" content="http://www.facebook.com/Exemplo-ecommerce" />
                <meta property="article:tag" content="" />
                <meta property="article:section" content="Produtos" />
                <meta property="article:published_time" content={new Date()} />
            </Head>

            <PageLayout>

                <section>

                    <h1>{product.title}</h1>

                    <div className='img-buy'>
                        <div className='img-container'>
                            <img 
                            src='https://i.picsum.photos/id/892/800/400.jpg'
                                /*src='https://picsum.photos/800/400'*/
                                /*src={product.images[0] && product.images[0].url} */
                                alt={'imagem-' + product.title.split(' ').join('-')} 
                            />
                        </div>

                        <div className='buy'>
                            <h2>Preço</h2>
                            <p className='price'>R$ {finalPrice} a unidade</p>
                            {(productState.quantity_stock > 0)
                                ? (productState.discount_percent != 0) 
                                    ? <p className='discount'>-{productState.discount_percent}%</p>
                                    : null
                                : <p className='lacking'>Em falta</p>
                            }
                            <p>Qtd: <input type="number" id="qtd" value={qtdState} onChange={(event) => verifyQtd(event.target.value)} /></p> 
                            <p>Disponível: {productState.quantity_stock}</p>
                            <p className='total'>Total: R$ {(finalPrice * qtdState).toFixed(2)}</p>
                            <button type='button' onClick={addToCartButton} disabled={buyButtonDisabledState}>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>

                    <div className='description'>
                        <p>Descrição: {product.description}</p>
                        <p>Peso: {product.weight}g</p>
                        <p>Comprimento: {product.length}cm</p>
                        <p>Altura: {product.height}cm</p>
                        <p>Largura: {product.width}cm</p>
                        <p>Diametro: {product.diameter}cm</p>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: productState.html_body }} />

                </section>
                
            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 20px 0;
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

                .img-container {
                    width: 100%;
                    max-width: 700px;
                    height: 400px;
                    
                    display: flex;
                    justify-content: center;
                }

                .img-container img {
                    width: 100%;
                    max-width: 700px;
                    height: auto;
                }

                .buy {
                    width: 100%;
                    max-width: 400px;
                    height: 400px;
                    background: #0D2235;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 0 0 0 10px;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                }

                .buy .price {
                    font-size: 20px;
                    font-weight: bold;
                }

                .buy .total {
                    font-size: 30px;
                    font-weight: bold;
                }

                .buy .discount {
                    background: #41773A;
                    padding: 10px 20px;
                }

                .buy .lacking {
                    background: #a32e39;
                    padding: 10px 20px;
                }

                .buy input#qtd {
                    width: 45px;
                    height: 30px;
                    font-size: 20px;
                    border: 0;
                    border-radius: 5px;
                    padding: 3px;
                }

                .buy button {
                    background: ${(buyButtonDisabledState) ? '#a32e39' : '#3E8C34'};
                    width: 100%;
                    height: 50px;
                    border: 0;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 20px;
                    font-weight: bold;
                    color: inherit;
                }

                .buy button p {
                    margin: 5px 0 0 0;
                }

                .buy button:hover {
                    background: #41A933;
                }

                .buy button:active {
                    background: #3E8C34;
                }

                .buy button:disabled {
                    background: #a32e39;
                }

                .description {
                    margin: 10px 0;
                    line-height: 25px;
                }

                @media (max-width: 1285px) {
                    padding: 0;

                    .img-buy {
                        flex-direction: column;
                        align-items: center;
                    }

                    .buy {
                        margin: 10px 0 0 0;
                    }
                }

                @media (max-width: 800px) {

                    
                }
            `}</style>
        </>
    );
}

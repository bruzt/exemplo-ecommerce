import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import api from '../services/api';
import { useCart } from '../context/cartContext';
import { useFilterBar } from '../context/filterBarContext';

import PageLayout from '../components/PageLayout';
import ImageSlider from '../components/ImageSlider';

export async function getStaticPaths() {

    const response = await api.get('/products');
    
    const paths = response.data.products.map( (data) => ({ 
        params: { 
            productId: String(data.id),
            //productName: data.title.split(' ').join('-')
        }}));
        
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {

    const response = await api.get(`/products/${params.productId}`);

    return {
        props: { product: response.data }
    }
}

export default function Product({ product }) {
    
    const [getQuantity, setQuantity] = useState(1);
    const [getBuyButtonDisabled, setBuyButtonDisabled] = useState(false);
    const [getProduct, setProduct] = useState({});

    const cartContext = useCart();
    const router = useRouter();
    const filterBarContext = useFilterBar();
    
    const finalPrice = (getProduct.discount_percent == 0) 
        ? Number(getProduct.price).toFixed(2)
        : (getProduct.price - (getProduct.price * (getProduct.discount_percent/100))).toFixed(2);

    useEffect( () => {

        fetchProduct();

    }, []);

    useEffect( () => {

        if(getProduct.quantity_stock == 0){

            setBuyButtonDisabled(true);
            setQuantity(0);
        }

    }, [getProduct]);

    async function fetchProduct(){

        try {

            const response = await api.get(`/products/${product.id}`);

            setProduct(response.data);
            
        } catch (error) {
            console.error(error);
            alert('Erro, recarregue a página');
        }
    }

    function handleQuantity(value){

        if(getProduct.quantity_stock > 0){

            if(value == 0 || value == null){
                    
                setBuyButtonDisabled(true);
                setQuantity(value);  
    
            } else if (value < 0){
    
                setBuyButtonDisabled(true);
                setQuantity(0);  
        
            } else if(value > getProduct.quantity_stock){
    
                setQuantity(getProduct.quantity_stock);
                setBuyButtonDisabled(false);
    
            } else {
    
                setQuantity(value);
                setBuyButtonDisabled(false);
            }

        }
    }

    function addToCartButton(){

        cartContext.addToCart({ id: getProduct.id, qtd: getQuantity });
        
        router.push('/order');
    }

    function findCategoryFather(fatherId){

        let categories = [];

        const [ father ] = filterBarContext.getCategories.filter( (category) => fatherId == category.id);

        if(father) {

            categories.push(father);
            
            categories.push(...findCategoryFather(father.parent_id));
        }

        return categories;
    }

    function handleCategorySearch(category){

        router.push({
            pathname: '/search',
            query: {
                categoryId: category.id,
                page: 1,
                category: String(category.name).split(' ').join('-')
            }
        });
    }

    if(router.isFallback){
        return (
            <PageLayout>
                <div id="fallback-loading">
                    <Loader
                        type="TailSpin"
                        color="#0D2235"
                        height={150}
                        width={150}
                    />
                </div>

                <style jsx>{`

                    div#fallback-loading {
                        width: 100%;
                        height: calc(100vh - 200px);

                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </PageLayout>
        );

    } else {

        return (
            <>
                <Head>
                    <title>{product.title} | Exemplo e-commerce</title>
                    <meta name="description" content={product.description} />
                    <meta name="keywords" content={product.category.name}/>
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
    
                        <div className="breadcrumb">
                            <>
                                {(product.category.parent_id) && (
                                    <>
                                        {findCategoryFather(product.category.parent_id).reverse().map( (category, index) => (
                                            <React.Fragment key={index}>
                                                {(index != 0) && <span> {'>'} </span>}
                                                <a
                                                    onClick={() => handleCategorySearch(category)}
                                                > 
                                                    {category.name}
                                                </a>
                                            </React.Fragment>
                                        ))}
                                        <span> {'>'} </span>
                                    </>
                                )}
                                <a
                                    onClick={() => handleCategorySearch(product.category)}
                                >
                                    {product.category.name}
                                </a>
                            </>
                        </div>
    
                        <h1>{product.title}</h1>
    
                        <div className='img-slider-container'>
    
                            <ImageSlider images={product.images} />
    
                        </div>
    
                        <div className='buy-card-container'>
    
                            <div className='buy-card'>
                                <h2>Preço</h2>
                                {(getProduct.discount_percent > 0) ? <p className='original-price'>R$ {Number(getProduct.price).toFixed(2)}</p> : false} 
                                <p className='price'>R$ {finalPrice} a unidade</p>
                                {(getProduct.quantity_stock > 0)
                                    ? (getProduct.discount_percent > 0) 
                                        ? <p className='discount'>-{getProduct.discount_percent}%</p>
                                        : null
                                    : <p className='lacking'>Em falta</p>
                                }
                                <p>Qtd: <input type="number" id="qtd" value={getQuantity} onChange={(event) => handleQuantity(event.target.value)} /></p> 
                                <p>Disponível: {getProduct.quantity_stock}</p>
                                <p className='total'>Total: R$ {(finalPrice * getQuantity).toFixed(2)}</p>
                                <button type='button' onClick={addToCartButton} disabled={getBuyButtonDisabled}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
    
                        </div>
                    
                        <div className='description'>
                            <div>
                                <p>{product.description}</p>
                                <br/>
                                <p>Peso: {product.weight}kg</p>
                                <p>Comprimento: {product.length}cm</p>
                                <p>Altura: {product.height}cm</p>
                                <p>Largura: {product.width}cm</p>
                                {/*<p>Diametro: {product.diameter}cm</p>*/}
                            </div>
                        </div>
    
                        <div 
                            className="html-body" 
                            dangerouslySetInnerHTML={{ __html: getProduct.html_body }}
                        />

                    </section>
                    
                </PageLayout>
    
                <style jsx>{`
                    section {
                        min-height: 800px;
    
                        display: grid;
                        grid-template-columns: 1fr 400px;
                        grid-template-rows: 60px minmax(40px, auto) 425px auto 1fr;
                        grid-template-areas: 
                            "breadcrumb breadcrumb"
                            "title title"
                            "slider-container cart-card"
                            "description cart-card"
                            "html-body cart-card"
                        ;
                    }
    
                    div.breadcrumb {
                        grid-area: breadcrumb;
                        padding: 10px;
                        background: #0D2235;
                        border-bottom-right-radius: 5px;
                        border-bottom-left-radius: 5px;
                        margin-bottom: 20px;
                        font-size: 18px;
                    }
    
                    div.breadcrumb a {
                        cursor: pointer;
                    }
    
                    h1 {
                        grid-area: title;
                        text-align: center;
                        margin-bottom: 20px;
                    }
    
    
                    div.img-slider-container {
                        grid-area: slider-container;
                    }
    
                    .img-container {
                        width: 100%;
                        max-width: 700px;
                        height: 400px;
                        
                        display: flex;
                        justify-content: center;
                    }
    
                    .buy-card-container {
                        grid-area: cart-card;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        margin: 0;
                        justify-content: space-between;
                    }
    
                    .buy-card {
                        position: sticky;
                        top: 5px;
    
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
    
                    .buy-card .price {
                        font-size: 20px;
                        font-weight: bold;
                    }
    
                    .buy-card .original-price {
                        text-decoration: line-through;
                    }
    
                    .buy-card .total {
                        font-size: 30px;
                        font-weight: bold;
                    }
    
                    .buy-card .discount {
                        background: #41773A;
                        padding: 10px 20px;
                    }
    
                    .buy-card .lacking {
                        background: #a32e39;
                        padding: 10px 20px;
                    }
    
                    .buy-card input#qtd {
                        width: 45px;
                        height: 30px;
                        font-size: 20px;
                        border: 0;
                        border-radius: 5px;
                        padding: 3px;
                    }
    
                    .buy-card button {
                        background: ${(getBuyButtonDisabled) ? '#a32e39' : '#3E8C34'};
                        width: 100%;
                        height: 50px;
                        border: 0;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 20px;
                        font-weight: bold;
                        color: inherit;
                    }
    
                    .buy-card button p {
                        margin: 5px 0 0 0;
                    }
    
                    .buy-card button:hover {
                        background: #41A933;
                    }
    
                    .buy-card button:active {
                        background: #3E8C34;
                    }
    
                    .buy-card button:disabled {
                        background: #a32e39;
                    }
    
                    .description {
                        grid-area: description;
                        margin: 10px 0;
                        line-height: 25px;
                    }
    
                    section div.html-body {
                        grid-area: html-body;

                        width: 100%;
                        max-width: 700px;
                        height: 100%;

                        overflow-x: hidden;

                        margin-top: 20px;
                        padding-bottom: 20px;
                    }
    
                    @media (max-width: 1180px) {
                        padding: 0;
    
                        section {
                            grid-template-columns: 100vw;
                            grid-template-rows: 60px minmax(40px, auto) 425px 425px auto 1fr;
                            grid-template-areas: 
                                "breadcrumb"
                                "title"
                                "slider-container"
                                "cart-card"
                                "description"
                                "html-body"
                            ;
                        }
    
                        div.img-slider-container, div.buy-card-container, div.description, div.html-body  {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                `}</style>
            </>
        );
    }
}

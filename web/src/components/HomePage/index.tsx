import React/*, { useState, useEffect }*/ from 'react';
import Head from 'next/head'
import Link from 'next/link';

//import api from '../../services/api';

import { Container } from './styles';

import PageLayout from '../PageLayout';
import ProductCard from '../productComponents/ProductCard';

import { IProduct } from '../../pages/[productId]';

interface IProps {
    onSale: IProduct[];
    bestSellers: IProduct[];
    news: IProduct[];
}
 
export default function HomePage({ onSale, bestSellers, news }: IProps) {
    
    /*
    const [onSale, setOnSale] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [news, setNews] = useState([]);

    useEffect( () => {

        fetchProducts();
        
    }, []);

    async function fetchProducts(){

        try {

            const onSale = await api.get('/products?section=on-sale&limit=6');
            const bestSellers = await api.get('/products?section=best-sellers&limit=6');
            const news = await api.get('/products?section=news&limit=6');

            setOnSale(onSale.data.products);
            setBestSellers(bestSellers.data.products);
            setNews(news.data.products);
            
        } catch (error) {
            console.log(error);
            alert('Erro, não foi possivel obter os produtos, tente novamente');
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

                <Container>

                    {onSale.length > 0 && (
                        <>
                            <Link href='/search?page=1&section=on-sale'>
                                <a>
                                    <h3>PROMOÇÕES</h3>  
                                </a>
                            </Link>
                            <div className="product-grid" data-testid='on-sale-section'>

                                {onSale.map( (product) => <ProductCard product={product} key={product.id} />)}

                            </div>
                        </>
                    )}

                    {bestSellers.length > 0 && (
                        <>
                            <Link href='/search?page=1&section=best-sellers'>
                                <a>
                                    <h3>MAIS VENDIDOS</h3>
                                </a>
                            </Link>
                            <div className="product-grid" data-testid='best-sellers-section'>

                                {bestSellers.map( (product) => <ProductCard product={product} key={product.id} />)}

                            </div>
                        </>
                    )}

                    {news.length > 0 && (
                        <>
                            <Link href='/search?page=1&section=news'>
                                <a>
                                    <h3>NOVIDADES</h3>
                                </a>
                            </Link>
                            <div className="product-grid" data-testid='news-section'>

                                {news.map( (product) => <ProductCard product={product} key={product.id} />)}

                            </div>
                        </>
                    )}
                </Container>

            </PageLayout>
        </>
    );
}

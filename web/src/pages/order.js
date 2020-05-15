import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../services/api';

import { useCart } from '../context/cartContext';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainLayout from '../components/MainLayout';

export default function Order() {

    const [productsState, setProducts] = useState([]);

    const cartContext = useCart();

    useEffect( () => {

        getProducts();

    }, []);

    async function getProducts(){

        const products = []

        for(let i = 0; i < cartContext.cart.length; i++){

            try {

                const response = await api.get(`/products/${cartContext.cart[i].id}`);
                

                products.push(response.data);

            } catch (error) {
                console.error(error);
                alert('Erro, recarregue a página');
                break;
            }
        }

        setProducts(products);
    }

    return (
        <>
            <Head>
                <title>Carrinho de compras</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Header />

            <MainLayout>

                <section>

                    <div className='cart-grid'>
                        {productsState.length > 0 && productsState.map( (product) => (
                            <div className='cart-card' key={product.id}>
                                {product.name}
                            </div>
                        ))}
                    </div>
                    
                </section>

            </MainLayout>

            <Footer />

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 10px;
                }
            `}</style>
        </>
    );
}

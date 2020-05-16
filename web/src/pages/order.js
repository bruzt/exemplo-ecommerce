import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../services/api';
import Link from 'next/link';

import { useCart } from '../context/cartContext';

import PageLayout from '../components/PageLayout';

export default function Order() {

    const [productsState, setProducts] = useState([]);
    const [totalPriceState, setTotalPrice] = useState(0);

    const cartContext = useCart();

    useEffect( () => {

        getProducts();
        
    }, []);

    useEffect( () => {

        calcTotalPrice();
        
    }, [productsState, cartContext.cart]);

    function calcTotalPrice(){

        let totalPrice = 0;

        for(let i = 0; i < cartContext.cart.length; i++){
            
            if(productsState.length > 0){

                totalPrice += productsState[i].finalPrice * cartContext.cart[i].qtd;
            }
        }

        setTotalPrice(totalPrice.toFixed(2));
    }

    async function getProducts(){

        const products = []

        for(let i = 0; i < cartContext.cart.length; i++){

            try {

                const response = await api.get(`/products/${cartContext.cart[i].id}`);

                const finalPrice = (response.data.discount_percent == 0)
                    ? Number(response.data.price).toFixed(2)
                    : (response.data.price - (response.data.price * (response.data.discount_percent/100))).toFixed(2);
                
                products.push({ finalPrice, ...response.data });

            } catch (error) {
                console.error(error);
                alert('Erro, recarregue a página');
                break;
            }
        }

        setProducts(products);
    }

    function verifyQtd({ id, qtd }){

        const product = productsState.filter( (product) => product.id == id);

        const cart = cartContext.cart.filter( (product) => product.id == id);

        if(((cart[0].qtd + qtd) == (product[0].quantity_stock + 1)) || ((cart[0].qtd + qtd) < 1)){

            qtd = 0;

        } else if((cart[0].qtd) > product[0].quantity_stock){

            qtd = product[0].quantity_stock - cart[0].qtd;
        }        

        cartContext.addToCart({ id, qtd });
    }

    function removeFromCart(id){

        const products = productsState.filter( (product) => product.id != id);

        setProducts(products);
        cartContext.removeFromCart(id);
    }

    return (
        <>
            <Head>
                <title>Carrinho de compras</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    
                    <table>
                        <thead>
                            <tr>
                                <th className='th-image'>Imagem</th>
                                <th className='th-product'>Produto</th>
                                <th className='th-price'>Preço unitário</th>
                                <th className='th-qtd'>Quantidade</th>
                                <th className='th-total'>Preço total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsState.length > 0 && productsState.map( (product, index) => (
                                <tr key={product.id}>
                                    <td className='td-image'>
                                        <p>
                                            <img 
                                                src='https://picsum.photos/800/400'
                                                /*src={product.images[0] && product.images[0].url} */
                                                alt={'imagem-' + product.name.split(' ').join('-')} 
                                            />
                                        </p>
                                    </td>
                                    <td className='td-name'>
                                        <p>
                                            <Link href={`/product/${product.id}`}>
                                                <a>
                                                    <span className='over-hidden'>{product.name}</span>
                                                    {(product.discount_percent != 0) 
                                                        ? <span className='order-discount'>-{product.discount_percent}%</span>
                                                        : null
                                                    }
                                                </a>
                                            </Link>
                                        </p>
                                    </td>
                                    <td className='td-price'>
                                        <p>
                                            R$ {product.finalPrice}
                                        </p>
                                    </td>
                                    <td className='td-qtd'>
                                        <p>
                                            <button type="button" id='remove' onClick={() => removeFromCart(product.id)} title='Remover do carrinho'>
                                                X
                                            </button>
                                            <button type="button" id='less' onClick={() => verifyQtd({ id: product.id, qtd: -1 })} title='Remover 1'>
                                                -
                                            </button>
                                            <span className='cart-qtd'>{cartContext.cart[index].qtd}</span>
                                            <button type="button" id='plus' onClick={() => verifyQtd({ id: product.id, qtd: 1 })} title='Adicionar 1'>
                                                +
                                            </button>
                                        </p>
                                        <p>
                                            Disponível: {product.quantity_stock}
                                        </p>
                                    </td>
                                    <td className='td-total'>R$ {(product.finalPrice * cartContext.cart[index].qtd).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total-price">
                        <p>Total: R$ {totalPriceState}</p>
                    </div>
                    
                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 10px;
                }

                table {
                    width: 100%;
                }

                .th-image {
                    width: 10%;
                }

                .th-product {
                    width: 45%;
                }

                .th-price {
                    width: 15%; 
                }

                .th-qtd {
                    width: 15%;
                }

                .th-total {
                    width: 15%;
                }

                tbody tr td {
                    height: 50px;
                    vertical-align: middle;
                }

                .td-image {
                    text-align: center;
                }

                .td-image img {
                    max-width: 100%;
                    height: 50px;
                }

                .td-name .over-hidden {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    /*padding: 10px 0 0 0;*/
                }

                .td-name a {
                    display: flex;
                    justify-content: space-between;
                }

                .td-name .order-discount {
                    background: #3E8C34;
                    padding: 5px 10px;
                    margin: 0 0 0 10px;
                }

                .td-price {
                    text-align: center;
                }

                .td-qtd p {
                    display: flex;
                    justify-content: center;
                }

                .td-qtd .cart-qtd {
                    font-weight: bold;
                    font-size: 20px;
                }

                .td-qtd p + p {
                    margin: 5px 0 0 0;
                }

                .td-qtd button {
                    width: 20px; 
                    height: 20px;
                    margin: 0 10px;
                    border: 0;
                    border-radius: 2px;
                    font-weight: bold;
                }

                .td-qtd button:active {
                    background: #3E8C34;
                }

                .td-qtd button#remove {
                    background: #a32e39;
                }
                
                .td-qtd button#remove:active { 
                    background: #bf2232;
                }

                .td-qtd input {
                    width: 40px;
                }

                .td-total {
                    text-align: center;
                }

                .total-price {
                    font-size: 30px;
                    font-weight: bold;
                    float: right;
                    margin: 30px 0 0 0;
                }
            `}</style>
        </>
    );
}

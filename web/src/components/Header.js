import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

import { useCart } from '../context/cartContext';

export default function Header() {

    const cartContext = useCart();
  
    return (
        <>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    outline: 0;
                    box-sizing: border-box;
                }
            
                html, body {
                    height: 100%;
                }
            
                body {
                    background: #99a19b;
                    font-family: Arial, Helvetica, sans-serif;
                }
            
                a {
                    text-decoration: none;
                    color: inherit;
                }
            `}</style>

            <header>
                <div className='limit-center'>
                    <Link href='/'>
                        <img 
                            src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                            alt='logo' 
                            title='Home'
                        />
                    </Link>

                    <div className='icon' title='Carrinho de compras'>
                        <Link href='/order'>
                            <a>
                                <div className='cart-number'>
                                    <p>{cartContext.cart.length}</p>
                                </div>
                                <FaShoppingCart size={40} />
                                <p>Carrinho</p>
                            </a>
                        </Link>
                    </div>
                </div>
            </header>

            <style jsx>{`
                header {
                    height: 100px;
                    border-bottom: 1px solid black;
                    background: #60615b;
                }

                header .limit-center {
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto;

                    display: flex;
                    justify-content: space-between;
                }

                header img {
                    max-width: 100%;
                    height: 90px;
                    align-self: center;
                    cursor: pointer;
                }

                header .icon {
                    margin: 35px 10px 0 0;
                    text-align: center;
                }

                header .cart-number {
                    position: absolute;
                    margin: 0 0 0 40px;
                    background: #8f182a;
                    padding: 1px 5px;
                    border-radius: 20px;
                    z-index: 10;
                }

                header .cart-number p {
                    padding: 0;
                    margin: 0;
                }
            `}</style>
        </>
    );
}

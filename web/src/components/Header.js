import React from 'react';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

import { useCart } from '../context/cartContext';
import { useLogin } from '../context/loginContext';
import { useOrder } from '../context/orderContext';

import LoginModal from './LoginModal';

export default function Header() {

    const loginContext = useLogin();
    const cartContext = useCart();
    const orderContext = useOrder();

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

            <LoginModal />

            <header>
                <div className='limit-center'>
                    <Link href='/'>
                        <img
                            src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                            alt='logo'
                            title='Home'
                        />
                    </Link>

                    <div className='login-cart'>
                        {(loginContext.login == false) ? (
                            <button
                                className='login-button'
                                type='button'
                                title='Fazer Login'
                                onClick={loginContext.handleSwitchModal}
                            >
                                Entrar&nbsp;<FaSignInAlt />
                            </button>
                        ) 
                        : ((loginContext.userData) ? (

                                <button
                                    className='user-button'
                                    type='button'
                                    onClick={() => loginContext.logOut()}
                                >
                                    Olá, {loginContext.userData.name.split(' ')[0]}
                                </button>
                            ) : <span></span>
                        )}

                        <div className='icon' title='Carrinho de compras'>
                            <Link href='/order'>
                                <a onClick={() => orderContext.setOrder('cart')}>
                                    <div className='cart-number'>
                                        <p>{cartContext.cart.length}</p>
                                    </div>
                                    <FaShoppingCart size={40} />
                                    <p>Carrinho</p>
                                </a>
                            </Link>
                        </div>

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

                header .login-cart {
                    display: flex;
                    justify-content: space-between;
                    width: 25%;
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

                .login-cart .login-button {
                    width: 80px;
                    height: 20px;
                    margin: 70px 0 0 0;
                    border: 0;
                    background: transparent;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    
                    display: flex;
                    align-items: center;
                }

                .login-cart .user-button {
                    width: 100px;
                    height: 20px;
                    margin: 70px 0 0 0;
                    border: 0;
                    background: transparent;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    
                    display: flex;
                    align-items: center;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            `}</style>
        </>
    );
}

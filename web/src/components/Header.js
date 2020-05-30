import React from 'react';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

import { useCart } from '../context/cartContext';
import { useUser } from '../context/userContext';
import { useOrder } from '../context/orderContext';

import GlobalStyle from './GlobalStyle';
import LoginModal from './LoginModal';
import ManuAndSearchBar from './MenuAndSeachBar';

export default function Header() {

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    return (
        <>
            <GlobalStyle />

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
                        {(userContext.getLogin == false) ? (
                            <button
                                className='login-button'
                                type='button'
                                title='Fazer Login'
                                onClick={() => userContext.handleSwitchModal()}
                            >
                                Entrar&nbsp;<FaSignInAlt />
                            </button>
                        ) 
                        : ((userContext.getUser) ? (

                                <button
                                    className='user-button'
                                    type='button'
                                    onClick={() => userContext.logOut()}
                                >
                                    Olá, {userContext.getUser.name.split(' ')[0]}
                                </button>
                            ) : <span></span>
                        )}

                        <div className='icon' title='Carrinho de compras'>
                            <Link href='/order'>
                                <a onClick={() => orderContext.setOrder('cart')}>
                                    <div className='cart-number'>
                                        <p>{cartContext.getCart.length}</p>
                                    </div>
                                    <FaShoppingCart size={40} />
                                    <p>Carrinho</p>
                                </a>
                            </Link>
                        </div>

                    </div>
                </div>
            </header>

            <ManuAndSearchBar />

            <style jsx>{`
                header {
                    height: 100px;
                    background: #0D2235;
                    color: #eee;
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

                .login-cart .login-button, .user-button {
                    width: 100px;
                    height: 20px;
                    margin: 70px 0 0 0;
                    border: 0;
                    background: transparent;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    color: #eee;

                    display: flex;
                    align-items: center;
                }
                
                .login-cart .user-button {
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

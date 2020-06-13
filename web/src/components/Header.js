import React from 'react';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

import { useCart } from '../context/cartContext';
import { useUser } from '../context/userContext';
import { useOrder } from '../context/orderContext';

import GlobalStyle from './GlobalStyle';
import LoginModal from './LoginModal';
import MenuAndSearchBar from './MenuAndSeachBar';

export default function Header() {

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    /*<button
        className='user-button'
        type='button'
        onClick={() => userContext.logOut()}
    >
        Olá, {userContext.getUser.name.split(' ')[0]}
    </button>*/

    return (
        <>
            <GlobalStyle />

            {(userContext.getShowModal) ? <LoginModal /> : false}  

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
                                <FaSignInAlt />&nbsp;Entrar
                            </button>
                        ) 
                        : ((userContext.getUser) 
                            ? (
                                <div className="dropdown">
                                    <span>Olá, {userContext.getUser.name.split(' ')[0]}</span>
                                    <div className="dropdown-content">
                                        <p
                                            onClick={() => {}}
                                        >
                                            <FaUserCircle />&nbsp;Minha Conta
                                        </p>
                                        <p
                                            onClick={() => userContext.logOut()}
                                        >
                                            <FaSignOutAlt />&nbsp;Sair
                                        </p>
                                    </div>
                                </div>
                            )
                            : <span></span>
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

            <MenuAndSearchBar />

            <style jsx>{`
                header {
                    height: 100px;
                    background: #0D2235;
                }

                div.limit-center {
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

                div.login-cart {
                    display: flex;
                    justify-content: space-between;
                    width: 25%;
                }

                .dropdown {
                    position: relative;
                    display: inline-block;
                }

                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: #eee;
                    color: #0D2235;
                    min-width: 160px;   
                    z-index: 10;
                    margin: 45px 0 0 0;
                }

                .dropdown:hover .dropdown-content {
                    display: block;
                }

                .dropdown-content p {
                    padding: 5px;
                    display: flex;
                    align-items: center;
                }

                .dropdown-content p:hover {
                    background: #c8c8c8;
                }

                /*ul.user-menu {
                    list-style: none;
                }

                ul.user-menu > li {

                    position: relative;
                    z-index: 10;
                }

                ul.user-menu li > ul {
                    width: 150px;
                    height: 50px;
                    position: absolute; 
                    bottom: 0;
                    top: 25px;
                    background: #eee;  
                    z-index: 20;
                }

                ul.user-menu li > ul li {
                    color: #232b2b; 
                }

                ul.user-menu li > ul li:hover {
                    background: #A9A9A9;
                }*/

                button.login-button, .dropdown {
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
                
                li.user-name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                div.icon {
                    margin: 35px 10px 0 0;
                    text-align: center;
                }

                div.cart-number {
                    position: absolute;
                    margin: 0 0 0 40px;
                    background: #8f182a;
                    padding: 1px 5px;
                    border-radius: 20px;
                    z-index: 20;
                }

                div.cart-number p {
                    padding: 0;
                    margin: 0;
                }


            `}</style>
        </>
    );
}

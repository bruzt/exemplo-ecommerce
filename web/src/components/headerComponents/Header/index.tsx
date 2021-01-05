import React from 'react';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

import logo from '../../../assets/logo.jpg'

import { useCart } from '../../../contexts/cartContext';
import { useUser } from '../../../contexts/userContext';
import { useOrder } from '../../../contexts/orderContext';
import { useTheme } from '../../../contexts/themeContext';

import LoginModal from '../LoginModal';
import CategoriesAndSeachBar from '../CategoriesAndSeachBar';

import { Container } from './styles';

export default function Header() {
	
	const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();
    const router = useRouter();
    const themeContext = useTheme();

    return (
        <>
            <Head>
                <meta name="theme-color" content={themeContext.getTheme.primary} />
            </Head>
        
            <Container>

                {(userContext.getShowModal) ? <LoginModal /> : false}  

                <header>
                    <div className='limit-center'>
                        <Link href='/'>
                            <a>
                                <img
                                    src={logo}
                                    alt='logo'
                                    title='Home'
                                />
                            </a>
                        </Link>

                        <div className='login-cart'>

                            <div className="login">
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
                                            <span className='name'>Olá, {userContext.getUser.name.split(' ')[0]}</span>
                                            <div className="dropdown-content">
                                                <p
                                                    onClick={() => router.push({
                                                        pathname: '/account',
                                                        query: { menu: 'account-data' }
                                                    })}
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
                            </div>

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

                <CategoriesAndSeachBar />
                
            </Container>
        </>
	);
}

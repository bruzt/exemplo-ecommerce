import React from 'react';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Loader from 'react-loader-spinner';

import { useCart } from '../../../contexts/cartContext';
import { useUser } from '../../../contexts/userContext';
//import { useOrder } from '../../../contexts/orderContext';
import { useTheme } from '../../../contexts/themeContext';

import LoginModal from '../LoginModal';
import CategoriesAndSeachBar from '../CategoriesAndSeachBar';

import { Container } from './styles';

export default function Header() {

    const userContext = useUser();
    const cartContext = useCart();
    //const orderContext = useOrder();
    const router = useRouter();
    const themeContext = useTheme();

    function handleGoToAccount() {

        router.push({
            pathname: '/account',
            query: { menu: 'account-data' }
        })
    }

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
                                    src='/images/logo.jpg'
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
                                        data-testid='login-button'
                                        type='button'
                                        title='Fazer Login'
                                        disabled={userContext.getIsFetchingUser}
                                        onClick={() => userContext.handleSwitchModal()}
                                    >
                                        {(userContext.getIsFetchingUser) ? (
                                            <Loader
                                                type="TailSpin"
                                                color="#eee"
                                                height='1.5rem'
                                                width='1.5rem'
                                            />
                                        ) : (
                                            <>
                                                <FaSignInAlt />&nbsp;Entrar
                                            </>
                                        )}
                                    </button>

                                ) : ((userContext.getUser) ? (
                                    <div className="dropdown" data-testid='dropdown-user'>
                                        <span className='name'>Olá, {userContext.getUser.name.split(' ')[0]}</span>
                                        <div className="dropdown-content">
                                            <p onClick={handleGoToAccount} data-testid='go-to-account'>
                                                <FaUserCircle />&nbsp;Minha Conta
                                            </p>
                                            <p onClick={() => userContext.logOut()} data-testid='logout'>
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
                                    <a /*onClick={() => orderContext.setOrderFlowNumber(1)}*/>
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

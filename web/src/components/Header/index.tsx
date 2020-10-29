import React from 'react';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCart } from '../../contexts/cartContext';
import { useUser } from '../../contexts/userContext';
import { useOrder } from '../../contexts/orderContext';

import GlobalStyle from '../../styles/GlobalStyle';
import LoginModal from '../LoginModal';
import CategoriesAndSeachBar from '../CategoriesAndSeachBar';

import { Container } from './styles';

export default function Header() {
	
	const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();
    const router = useRouter();

    return (
        <Container>
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
	);
}

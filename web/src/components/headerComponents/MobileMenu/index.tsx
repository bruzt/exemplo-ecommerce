import React from 'react';
import { FaTimes, FaSearch, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { Container } from './styles';

import { useUser } from '../../../contexts/userContext';

interface IProps {
    setMobileMenuActive: React.Dispatch<boolean>;
    searchBar: () => React.ReactNode;
}

export default function MobileMenu({ setMobileMenuActive, searchBar }: IProps) {

    const userContext = useUser();
    const router = useRouter();

    function handleLoginModal(){
        setMobileMenuActive(false);
        userContext.handleSwitchModal();
    }
    
    function handleUserAccount(){
        setMobileMenuActive(false);
        router.push({
            pathname: '/account',
            query: {
                menu: 'account-data'
            }
        });
    }

    function handleUserLogout(){
        setMobileMenuActive(false);
        userContext.logOut()
    }

    return (
        <Container>
            <div className='menu-header'>
                <div className="user-login">
                    {userContext.getLogin
                        ? (
                            <div className='user-menu'>
                                <button 
                                    type='button' 
                                    onClick={handleUserAccount}
                                >
                                    Conta do usuário
                                </button>
                                <button 
                                    type='button' 
                                    onClick={handleUserLogout}
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <button 
                                className='login' 
                                type='button'
                                onClick={handleLoginModal}
                            >
                                <FaSignInAlt />
                                <span>Entrar</span>
                            </button>
                        )
                    }
                </div>

                <button 
                    id='exit-mobile-menu'
                    type='button'
                    onClick={() => setMobileMenuActive(false)}
                >
                    <FaTimes size={40} />
                </button>
            </div>

            <div className="menu-body">

                {searchBar()}

            </div>

        </Container>
    );
}

import React from 'react';
import { useRouter } from 'next/router';

import api from '../../services/api';

import { Container } from './styles';

import { useTheme } from '../../contexts/ThemeContext';

export default function Header() {

    const router = useRouter();
    const themeContext = useTheme();

    function logOut(){

        api.defaults.headers.authorization = undefined;

        sessionStorage.removeItem('token');

        router.push('/');
    }
    
    return (
        <Container>

            <div>
                <button 
                    type='button'
                    onClick={() => themeContext.changeThemeTo('light')}
                >
                    Claro
                </button>

                <button 
                    type='button'
                    onClick={() => themeContext.changeThemeTo('dark')}
                >
                    Escuro
                </button>

            </div>

            <div>
                <button type='button' onClick={() => logOut()}>
                    Logout
                </button>
            </div>

        </Container>
    );
}

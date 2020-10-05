import React from 'react';
import { useRouter } from 'next/router';

import api from '../../services/api';

import { Container } from './styles';

export default function Header() {

    const router = useRouter();

    function logOut(){

        api.defaults.headers.authorization = undefined;

        sessionStorage.removeItem('token');

        router.push('/');
    }
    
    return (
        <Container>

            <div>
                
            </div>

            <div>
                <button type='button' onClick={() => logOut()}>
                    Logout
                </button>
            </div>

        </Container>
    );
}

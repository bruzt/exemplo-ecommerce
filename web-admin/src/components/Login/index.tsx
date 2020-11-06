import React, { FormEvent, useState } from 'react';
import Head from 'next/head';

import { Container } from './styles';

import { useLoginLogout } from '../../contexts/LoginLogoutContext';

import Button from '../genericComponents/Button';

export default function Login(){

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');

    const loginLogoutContext = useLoginLogout();

    function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        loginLogoutContext.login(getEmail, getPassword);
    }

    return (
        <>
            <Head>
                    <title>Exemplo e-commerce Login page</title>
                    <meta name="robots" content="noindex" />
            </Head>
            <Container>
                
                <form onSubmit={onSubmit}>

                    <h2>Login</h2>
                    <hr/>

                    <div className="input-group">
                        <label htmlFor="email">e-mail</label>
                        <input type="email" id='email' value={getEmail} onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id='password' value={getPassword} onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    <Button type='submit'>
                        Entrar
                    </Button>

                </form>

            </Container>
        </>
    );
}

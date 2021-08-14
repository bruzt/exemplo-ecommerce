import React, { FormEvent, useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

import { useLoginLogout } from '../../contexts/LoginLogoutContext';

import Button from '../genericComponents/Button';

export default function Login(){

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');

    const [getIsSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    const loginLogoutContext = useLoginLogout();

    useEffect(() => {
        if(
            getEmail.trim().length < 8
            || getPassword.trim().length < 6
        ) {
            setIsSubmitButtonDisabled(true);
        } else {
            setIsSubmitButtonDisabled(false);
        }
    }, [getEmail, getPassword])

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        if(getIsSubmitButtonDisabled) return;

        const login = await loginLogoutContext.login(getEmail, getPassword);

        if(login == false) {
            setPassword('');
        }
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

                    <Button 
                        type='submit' 
                        className={`${loginLogoutContext.isFetching && 'is-fetching'}`}
                        disabled={getIsSubmitButtonDisabled || loginLogoutContext.isFetching}
                    >
                        {loginLogoutContext.isFetching
                            ? (
                                <Loader
                                    type="TailSpin"
                                    color="#0D2235"
                                    height={30}
                                    width={30}
                                />
                            )
                            : (
                                'Entrar'
                            )
                        }
                    </Button>

                </form>

            </Container>
        </>
    );
}

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../services/api';

import PageLayout from '../components/PageLayout';

export default function ForgotPass() {

    const [getToken, setToken] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const [getDisabledButton, setDisabledButton] = useState(true);

    const router = useRouter();

    useEffect( () => {

        if(router.query.token) setToken(router.query.token);
        
    }, [router.query.token]);

    useEffect( () => {

        if(
            getToken.length > 10 &&
            getPassword.length > 5 &&
            getConfirmPassword == getPassword
        ){
            setDisabledButton(false);

        } else setDisabledButton(true);
        
    }, [getToken, getPassword, getConfirmPassword]);

    async function handleSubmit(event){

        event.preventDefault();

        setDisabledButton(true);

        try {

            await api.put('/reset-password', {
                token: getToken,
                password: getPassword
            });

            router.push('/');
            
        } catch (error) {
            console.log(error);
            alert('Erro ao trocar senha');
            setDisabledButton(false);
        }
    }

    return (
        <>
            <Head>
                <title>Esqueceu a senha</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    <h1>Trocar senha</h1>

                    <form>
                        {/*<label htmlFor="token">Token</label>
                        <input 
                            type="text" 
                            id="token"
                            value={getToken}
                            onChange={(event) => setToken(event.target.value)}
                        />*/}

                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            id="password"
                            value={getPassword}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <label htmlFor="confirm-password">Confirmar senha</label>
                        <input 
                            type="password" 
                            id="confirm-password"
                            value={getConfirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />

                        <button 
                            type="submit"
                            disabled={getDisabledButton}
                            onClick={(event) => handleSubmit(event)}
                        >
                            Trocar senha
                        </button>
                    </form>

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    width: 100%;
                    min-height: 500px;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                form {
                    width: 100%;
                    max-width: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }

                form label {
                    margin: 10px 0 0 5px;
                }

                form input {
                    height: 40px;
                    border: 0;
                    border-radius: 5px;
                    padding: 5px;
                    font-size: 20px;
                }

                form button {
                    margin: 20px 0 0 0;
                    height: 50px;
                    font-size: 20px;
                    border: 0;
                    border-radius: 5px;
                    cursor: pointer;
                    background: #3E8C34;
                    color: inherit; 
                }

                form button:hover {
                    background: #41A933;
                }

                form button:active {
                    background: #3E8C34;
                }

                form button:disabled {
                    background: #a32e39;
                }

                form button:disabled:hover {
                    background: #bf2232;
                }
            `}</style>
        </>
    );
}

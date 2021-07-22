import React, { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../../../services/api';

import PageLayout from '../../PageLayout';

import { Container } from './styles';

interface IProps {
    _testToken?: string;
}

export default function ForgotPass({ _testToken }: IProps) {

    const [getToken, setToken] = useState(_testToken || '');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const [getDisabledButton, setDisabledButton] = useState(true);

    const router = useRouter();

    useEffect(() => {

        if (router.query.token) setToken(router.query.token as string);

    }, [router.query.token]);

    useEffect(() => {
        if (
            getToken.length > 10 &&
            getPassword.length > 5 &&
            getConfirmPassword == getPassword
        ) {
            setDisabledButton(false);

        } else setDisabledButton(true);

    }, [getToken, getPassword, getConfirmPassword]);

    async function handleSubmit(event: FormEvent) {

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
                <title>Trocar senha</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <Container>

                    <h1>Trocar senha</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            data-testid="password"
                            value={getPassword}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <label htmlFor="confirm-password">Confirmar senha</label>
                        <input
                            type="password"
                            id="confirm-password"
                            data-testid="confirm-password"
                            value={getConfirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />

                        <button
                            type="submit"
                            data-testid="submit-button"
                            disabled={getDisabledButton}
                        >
                            Trocar senha
                        </button>
                    </form>

                </Container>

            </PageLayout>
        </>
    );
}

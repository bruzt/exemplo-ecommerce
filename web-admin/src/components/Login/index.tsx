import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import api from '../../services/api';

import { Container } from './styles';

import Button from '../generic/Button';

interface ITokenPayload {
    id: number;
    admin: boolean;
}

export default function Login(){

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');

    const router = useRouter();

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        try {

            const response = await api.post('/sessions', {
                email: getEmail,
                password: getPassword
            });

            session(response.data.token);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao fazer login');
        }
    }

    function session(token: string){

         const tokenPayload: ITokenPayload = jwt.decode(token) as ITokenPayload;

         if(tokenPayload.admin){

             sessionStorage.setItem('token', token);
     
             api.defaults.headers.authorization = `Bearer ${token}`;
     
             router.push('/admin');

         } else {
             alert('Conta não autorizada');
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
                        <label htmlFor="">e-mail</label>
                        <input type="email" value={getEmail} onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="">Senha</label>
                        <input type="password" value={getPassword} onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    <Button type='submit'>
                        Entrar
                    </Button>

                </form>

            </Container>
        </>
    );
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import queryString from 'query-string';

import api from '../services/api';

interface ITokenPayload {
    id: number;
    admin: boolean;
}

interface ILoginLogoutHook {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const Context = createContext({});

let firstRender = true;

export function LoginLogoutContextProvider({ children }: ThemeContextProviderProps) {

    const router = useRouter();

    const [getToken, setToken] = useState('');

    useEffect( () => {
        if(process.browser){
            const token = localStorage.getItem('token');
            if (token) setToken(token);
        }
    }, []);

    useEffect( () => {
        if(firstRender === false) session(getToken);
        firstRender = false;
    }, [getToken])

    async function login(email: string, password: string) {
        try {

            const response = await api.post('/sessions', {
                email,
                password
            });

            session(response.data.token);

        } catch (error) {
            console.log(error);
            alert('Erro ao fazer login');
        }
    }

    async function session(token: string) {
        
        const tokenPayload: ITokenPayload = jwt.decode(token) as ITokenPayload;

        try {

            if (tokenPayload.admin == false) return alert('Conta não autorizada');

            localStorage.setItem('token', token);
            api.defaults.headers.authorization = `Bearer ${token}`;

            // confirm if the token is valid
            await api.get(`/users/${tokenPayload.id}`);

            const menuQueryString = queryString.parse(router.asPath)['/admin?menu'];

            const menu = menuQueryString ? menuQueryString : 'products-list';
            
            router.push({
                pathname: '/admin',
                query: {
                    menu
                }
            });

        } catch (error) {
            console.error(error);
            logout();
        }
    }

    function logout(){

        api.defaults.headers.authorization = undefined;

        localStorage.removeItem('token');

        router.push('/');
    }

    return (
        <Context.Provider
            value={{
                login,
                logout
            }}
        >
            {children}
        </Context.Provider>
    );
}

export function useLoginLogout() {

    const context = useContext(Context) as ILoginLogoutHook;

    return context;
}

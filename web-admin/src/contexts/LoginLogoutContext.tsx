import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

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

let isLogged = false;

export function LoginLogoutContextProvider({ children }: ThemeContextProviderProps) {

    const router = useRouter();

    if(process.browser && isLogged == false){

        const token = sessionStorage.getItem('token');
        if (token) session(token);
        else if(router.pathname !== '/') router.replace('/');
    }

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

    function session(token: string) {
        
        const tokenPayload: ITokenPayload = jwt.decode(token) as ITokenPayload;

        if (tokenPayload.admin) {

            sessionStorage.setItem('token', token);

            api.defaults.headers.authorization = `Bearer ${token}`;
            
            isLogged = true;
            router.push({
                pathname: '/admin',
                query: {
                    menu: 'products-list',
                }
            });

        } else {
            isLogged = false;
            alert('Conta não autorizada');
        }
    }

    function logout(){

        api.defaults.headers.authorization = undefined;

        sessionStorage.removeItem('token');

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

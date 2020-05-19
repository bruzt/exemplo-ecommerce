import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import api from '../services/api';

const Context = createContext({});

export function LoginContextProvider({ children }){

    const [loginState, setLogin] = useState(false);
    const [showModalState, setShowModal] = useState(false);
    const [userState, setUser] = useState(null);
    const [tokenState, setToken] = useState('');

    const router = useRouter();

    useEffect( () => {

        const token = sessionStorage.getItem('token');

        if(token) setToken(token);

    }, []);

    useEffect( () => {

        if(tokenState.length > 0){

            api.defaults.headers.authorization = "Bearer " + tokenState;   
            
            getUser();
            
            sessionStorage.setItem('token', tokenState);
    
            setLogin(true);
            setShowModal(false);
        }

    }, [tokenState]);

    function handleSwitchModal(){

        if(showModalState) setShowModal(false);
        else setShowModal(true);
    }

    async function logIn(email, password){

        try {

            const response = await api.post('/sessions', {
                email,
                password
            });

            setToken(response.data.token);

            return true;
            
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    function logOut(){

        router.push('/');

        api.defaults.headers.authorization = undefined;

        sessionStorage.removeItem('token');

        setLogin(false);
    }

    async function getUser(){

        if(tokenState.length > 0){

            const tokenPayload = jwt.decode(tokenState);
    
            const response = await api.get('/users/' + tokenPayload.id);
    
            setUser(response.data);
        }
    }

    return (
        <Context.Provider value={{ 
            modal: showModalState,  
            login: loginState, 
            handleSwitchModal, 
            logIn, 
            logOut, 
            userData: userState,
            setUser
        }}>
            {children}
        </Context.Provider>
    );
}

export function useLogin(){

    const context = useContext(Context);

    return context;
}
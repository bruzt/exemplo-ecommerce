import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import api from '../services/api';

const Context = createContext({});

export function UserContextProvider({ children }){

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

    /**
     * @param {Object} addressObject
     * @param {string} addressObject.street
     * @param {string} addressObject.number
     * @param {string} addressObject.district
     * @param {string} addressObject.city
     * @param {string} addressObject.state
     * @param {string} addressObject.zipcode
     * @returns {boolean}
     */
    async function addAddress(addressObject){

        try {

            const response = await api.post('/addresses', addressObject);

            const user = { ...userState };
            user.addresses.push(response.data);
            setUser(user);

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function deleteAddress(id){

        try {

            await api.delete('/addresses/' + id);

            const user = { ...userState };
            const addresses = user.addresses.filter( (address) => address.id != id);
            user.addresses = addresses;
            setUser(user);

            return true;
            
        } catch (error) {
            console.error(error);
            return false;
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
            setUser,
            addAddress,
            deleteAddress
        }}>
            {children}
        </Context.Provider>
    );
}

export function useUser(){

    const context = useContext(Context);

    return context;
}
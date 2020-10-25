import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import api from '../services/api';

const Context = createContext({});

export function UserContextProvider({ children }){

    const [getLogin, setLogin] = useState(false);
    const [getShowModal, setShowModal] = useState(false);
    const [getUser, setUser] = useState({});
    const [getToken, setToken] = useState('');

    const router = useRouter();

    useEffect( () => {

        const token = sessionStorage.getItem('token');

        if(token) setToken(token);

    }, []);

    useEffect( () => {

        if(getToken.length > 0){

            api.defaults.headers.authorization = "Bearer " + getToken;   
            
            fetchUser();
        }

    }, [getToken]);

    async function fetchUser(){

        try {
            
            const tokenPayload = jwt.decode(getToken);
    
            const response = await api.get('/users/' + tokenPayload.id);
    
            setUser(response.data);

            sessionStorage.setItem('token', getToken);
            setLogin(true);
            setShowModal(false);

        } catch (error) {

            console.log(error);
            
            api.defaults.headers.authorization = undefined;
            sessionStorage.removeItem('token');
            setLogin(false);
        }
    }

    function handleSwitchModal(){

        if(getShowModal) setShowModal(false);
        else setShowModal(true);
    }

    async function createUser(name, email, password){

        try {

            const response = await api.post('/users', {
                name,
                email,
                password
            });

            setToken(response.data.token);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar usuário');
        }
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

            const user = { ...getUser };
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

            const user = { ...getUser };
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
            getShowModal,  
            getLogin, 
            handleSwitchModal, 
            logIn, 
            logOut, 
            getUser,
            setUser,
            addAddress,
            deleteAddress,
            createUser
        }}>
            {children}
        </Context.Provider>
    );
}

export function useUser(){

    const context = useContext(Context);

    return context;
}
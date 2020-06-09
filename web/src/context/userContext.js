import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import api from '../services/api';

import validateCpf from '../utils/validateCpf';

const Context = createContext({});

export function UserContextProvider({ children }){

    const [getLogin, setLogin] = useState(false);
    const [getShowModal, setShowModal] = useState(false);
    const [getUser, setUser] = useState(null);
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
            
            sessionStorage.setItem('token', getToken);
    
            setLogin(true);
            setShowModal(false);
        }

    }, [getToken]);

    function handleSwitchModal(){

        if(getShowModal) setShowModal(false);
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

    async function fetchUser(){

        if(getToken.length > 0){

            const tokenPayload = jwt.decode(getToken);
    
            const response = await api.get('/users/' + tokenPayload.id);
    
            setUser(response.data);
        }
    }

    function formatZipCode(value){

        let zipCode = String(value);

        zipCode = zipCode.replace(/[^0-9]/g, "");

        if (zipCode.length == 8) {

            const part1 = zipCode.slice(0, 5);
            const part2 = zipCode.slice(5, 8);

            zipCode = `${part1}-${part2}`;
        }

        return zipCode;
    }

    function formatCpf(value){

        let cpf = String(value);

        cpf = cpf.replace(/[^0-9]/g, "");

        if (cpf.length == 11) {

            const part1 = cpf.slice(0, 3);
            const part2 = cpf.slice(3, 6);
            const part3 = cpf.slice(6, 9);
            const part4 = cpf.slice(9, 11);

            cpf = `${part1}.${part2}.${part3}-${part4}`;
        }

        const valid = validateCpf(cpf);

        return { cpf, valid };
    }

    function formatPhone(value){
        
        let phone = String(value);

        phone = phone.replace(/[^0-9]/g, "");

        if (phone.length == 10) {

            const part1 = phone.slice(0, 2);
            const part2 = phone.slice(2, 6);
            const part3 = phone.slice(6, 10);

            phone = `(${part1}) ${part2}-${part3}`;
        }

        if (phone.length == 11) {

            const part1 = phone.slice(0, 2);
            const part2 = phone.slice(2, 3);
            const part3 = phone.slice(3, 7);
            const part4 = phone.slice(7, 11);

            phone = `(${part1}) ${part2}-${part3}-${part4}`;
        }

        return phone;
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
            formatZipCode,
            formatCpf,
            formatPhone,
        }}>
            {children}
        </Context.Provider>
    );
}

export function useUser(){

    const context = useContext(Context);

    return context;
}
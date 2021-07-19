import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import api from '../services/api';

interface IProps {
    children: React.ReactNode;
    _testUser?: IUser;
}

interface IUser {
    id: number;
    name: string;
    email: string;
    cpf: string;
    admin: boolean;
    addresses: IAddress[];
}

export interface IAddress {
    id: number;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
}

interface IUseUser {
    getShowModal: boolean;  
    getLogin: boolean;  
    handleSwitchModal: () => void; 
    logIn: (email: string, password: string) => Promise<boolean>;
    logOut: () => void;
    getUser: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    addAddress: (address: Omit<IAddress, "id">) => Promise<boolean>;
    deleteAddress: (id: number) =>  Promise<boolean>;
    createUser: (name: string, email: string, cpf: string, password: string) =>  Promise<void>;
}

const Context = createContext({} as IUseUser);

export function UserContextProvider({ children, _testUser }: IProps){

    const [getLogin, setLogin] = useState(false);
    const [getShowModal, setShowModal] = useState(false);
    const [getUser, setUser] = useState<IUser>(_testUser);
    const [getToken, setToken] = useState('');

    const router = useRouter();

    useEffect( () => {
        const token = localStorage.getItem('token');

        if(token) setToken(token);
    }, []);

    useEffect( () => {
        if(getToken.length > 0){

            localStorage.setItem('token', getToken);
            api.defaults.headers.authorization = "Bearer " + getToken;   
            
            fetchUser();
        }
    }, [getToken]);

    async function fetchUser(){
        try {
            
            const tokenPayload = jwt.decode(getToken) as { id: number };
    
            const response = await api.get('/users/' + tokenPayload.id);
    
            setUser(response.data);

            setLogin(true);
            setShowModal(false);

        } catch (error) {
            console.log(error);
            
            api.defaults.headers.authorization = undefined;
            localStorage.removeItem('token');
            setLogin(false);
        }
    }

    function handleSwitchModal(){

        if(getShowModal) setShowModal(false);
        else setShowModal(true);
    }

    async function createUser(name: string, email: string, cpf: string, password: string){

        cpf = cpf.replace('.', '').replace('.', '').replace('-', '')

        try {

            const response = await api.post('/users', {
                name,
                email,
                cpf,
                password
            });

            setToken(response.data.token);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar usuário');
        }
    }

    async function logIn(email: string, password: string){
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

        localStorage.removeItem('token');

        setLogin(false);
    }

    async function addAddress(address: IAddress){

        try {

            const response = await api.post('/addresses', address);

            const user = { ...getUser };
            user.addresses.push(response.data);
            setUser(user);

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function deleteAddress(id: number){

        if(confirm('Tem certeza que deseja deletar esse endereço?')){
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
    }

    return (
        <Context.Provider 
            value={{ 
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
            }}
        >
            {children}
        </Context.Provider>
    );
}

export function useUser(){

    const context = useContext(Context);

    return context;
}
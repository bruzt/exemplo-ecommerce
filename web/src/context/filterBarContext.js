import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '../services/api';

const Context = createContext({});

export function FilterBarContextProvider({ children }){

    const [getSearchBarText, setSearchBarText] = useState('');
    const [getCategories, setCategories] = useState([]);

    const router = useRouter();

    useEffect( () => {

        fetchCategories();

    }, []);

    useEffect( () => {

        if(router.route == '/' || router.query.categoryId){

            setSearchBarText('');
        }
        
    }, [router.route, router.query]);

    async function fetchCategories(){

        try {

            const respose = await api.get('/categories');

            setCategories(respose.data);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Context.Provider value={{ 
            getSearchBarText, 
            setSearchBarText,
            getCategories
        }}>
            {children}
        </Context.Provider>
    );
}

export function useFilterBar(){

    const context = useContext(Context);

    return context;
}
import React, { createContext, useContext, useState, useEffect } from 'react';

import api from '../services/api';

const Context = createContext({});

export function FilterBarContextProvider({ children }){

    const [getSearchBarText, setSearchBarText] = useState('');
    const [getCategories, setCategories] = useState([]);

    useEffect( () => {

        fetchCategories();

    }, []);

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
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '../services/api';

interface IProps {
    children: React.ReactNode;
}

export interface ICategory {
    id: number;
    name: string;
    parent_id: number;
}

interface IUseFilterBar {
    getSearchBarText: string;
    setSearchBarText: React.Dispatch<string>;
    getCategories: ICategory[];
}

const Context = createContext({});

export function FilterBarContextProvider({ children }: IProps){

    const [getSearchBarText, setSearchBarText] = useState('');
    const [getCategories, setCategories] = useState<ICategory[]>([]);

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

    const context = useContext(Context) as IUseFilterBar;

    return context;
}
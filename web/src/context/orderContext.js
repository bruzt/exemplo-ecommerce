import React, { createContext, useContext, useState } from 'react';

const Context = createContext({});

export function OrderContextProvider({ children }){

    const [orderState, setOrder] = useState('cart');

    return (
        <Context.Provider value={{ order: orderState, setOrder }}>
            {children}
        </Context.Provider>
    );
}

export function useOrder(){

    const context = useContext(Context);

    return context;
}
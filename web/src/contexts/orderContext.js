import React, { createContext, useContext, useState } from 'react';

const Context = createContext({});

export function OrderContextProvider({ children }){

    const [getOrder, setOrder] = useState('cart');
    const [getOrderId, setOrderId] = useState(null);
    const [getBoletoUrl, setBoletoUrl] = useState('');

    return (
        <Context.Provider value={{ 
                getOrder, 
                setOrder,
                getOrderId,
                setOrderId,
                getBoletoUrl,
                setBoletoUrl
            }}>
            {children}
        </Context.Provider>
    );
}

export function useOrder(){

    const context = useContext(Context);

    return context;
}
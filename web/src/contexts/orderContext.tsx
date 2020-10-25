import React, { createContext, useContext, useState } from 'react';

type OrdersName = 'cart' | 'address' | 'payment' | 'thanksForBuy';

interface IProps {
    children: React.ReactNode;
}

interface IUseOrder {
    getOrder: OrdersName; 
    setOrder: React.Dispatch<OrdersName>;
    getOrderId: number | null;
    setOrderId: React.Dispatch<number | null>;
    getBoletoUrl: string;
    setBoletoUrl: React.Dispatch<string>;
}

const Context = createContext({});

export function OrderContextProvider({ children }: IProps){

    const [getOrder, setOrder] = useState('cart');
    const [getOrderId, setOrderId] = useState<number | null>(null);
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

    const context = useContext(Context) as IUseOrder;

    return context;
}
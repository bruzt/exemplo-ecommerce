import React, { createContext, useContext, useState } from 'react';

/**
 * 1 = cart
 * 2 = address
 * 3 = payment
 * 4 = thanks for buy (order creation confirmation)
 */
type OrderFlowNumber = 1 | 2 | 3 | 4;

interface IProps {
    children: React.ReactNode;
}

interface IUseOrder {
    getOrderFlowNumber: OrderFlowNumber; 
    setOrderFlowNumber: React.Dispatch<OrderFlowNumber>;
    getOrderId: number | null;
    setOrderId: React.Dispatch<number | null>;
    getBoletoUrl: string;
    setBoletoUrl: React.Dispatch<string>;
}

const Context = createContext({});

export function OrderContextProvider({ children }: IProps){

    const [getOrderFlowNumber, setOrderFlowNumber] = useState<OrderFlowNumber>(1);
    const [getOrderId, setOrderId] = useState<number | null>(null);
    const [getBoletoUrl, setBoletoUrl] = useState('');

    return (
        <Context.Provider value={{ 
                getOrderFlowNumber, 
                setOrderFlowNumber,
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
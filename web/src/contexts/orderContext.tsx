import React, { createContext, useContext, useState } from 'react';

type OrderFlowNumber = 1 | 2 | 3 | 4;

interface IProps {
    children: React.ReactNode;
    _testOrderFlowNumber?: OrderFlowNumber;
    _testOrderId?: number;
    _testBoletoUrl?: string;
}

interface IUseOrder {
    /**
     * 1 = cart;
     * 2 = address;
     * 3 = payment;
     * 4 = thanks for buy (order creation confirmation);
     */
    getOrderFlowNumber: OrderFlowNumber;

    /**
     * 1 = cart;
     * 2 = address;
     * 3 = payment;
     * 4 = thanks for buy (order creation confirmation);
     */
    setOrderFlowNumber: React.Dispatch<OrderFlowNumber>;

    getOrderId: number | null;
    setOrderId: React.Dispatch<number | null>;
    getBoletoUrl: string;
    setBoletoUrl: React.Dispatch<string>;
}

const Context = createContext({} as IUseOrder);

export function OrderContextProvider({ children, _testOrderFlowNumber, _testOrderId, _testBoletoUrl }: IProps) {

    const [getOrderFlowNumber, setOrderFlowNumber] = useState<OrderFlowNumber>(_testOrderFlowNumber || 1);
    const [getOrderId, setOrderId] = useState<number | null>(_testOrderId);
    const [getBoletoUrl, setBoletoUrl] = useState(_testBoletoUrl || '');

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

export function useOrder() {

    const context = useContext(Context);

    return context;
}
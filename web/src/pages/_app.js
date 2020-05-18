import React from 'react';

import { LoginContextProvider } from '../context/loginContext';
import { OrderContextProvider } from '../context/orderContext';
import { CartContextProvider } from '../context/cartContext';

export default function MyApp({ Component, pageProps }) {

    return (
        <LoginContextProvider>
            <OrderContextProvider>
                <CartContextProvider>
                
                    <Component {...pageProps} />

                </CartContextProvider>
            </OrderContextProvider>
        </LoginContextProvider>
    )
}
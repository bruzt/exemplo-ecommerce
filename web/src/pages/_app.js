import React from 'react';

import { UserContextProvider } from '../context/userContext';
import { OrderContextProvider } from '../context/orderContext';
import { CartContextProvider } from '../context/cartContext';

export default function MyApp({ Component, pageProps }) {

    return (
        <UserContextProvider>
            <OrderContextProvider>
                <CartContextProvider>
                
                    <Component {...pageProps} />

                </CartContextProvider>
            </OrderContextProvider>
        </UserContextProvider>
    )
}
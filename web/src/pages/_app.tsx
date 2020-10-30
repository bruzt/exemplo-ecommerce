import React from 'react';
import { AppProps } from 'next/app';

import { UserContextProvider } from '../contexts/userContext';
import { OrderContextProvider } from '../contexts/orderContext';
import { CartContextProvider } from '../contexts/cartContext';
import { FilterBarContextProvider } from '../contexts/filterBarContext';

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <UserContextProvider>
            <OrderContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                
                        <Component {...pageProps} />

                    </FilterBarContextProvider>
                </CartContextProvider>
            </OrderContextProvider>
        </UserContextProvider>
    )
}

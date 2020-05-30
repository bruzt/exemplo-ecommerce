import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { UserContextProvider } from '../context/userContext';
import { OrderContextProvider } from '../context/orderContext';
import { CartContextProvider } from '../context/cartContext';
import { FilterBarContextProvider } from '../context/filterBarContext';

export default function MyApp({ Component, pageProps }) {

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
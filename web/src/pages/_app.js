import React from 'react';

import { CartContextProvider } from '../context/cartContext';

export default function MyApp({ Component, pageProps }) {

    return (
        <CartContextProvider>
            
            <Component {...pageProps} />

        </CartContextProvider>
    )
}
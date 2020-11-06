import React from 'react';
import { AppProps } from 'next/app';

import { ThemeContextProvider} from '../contexts/ThemeContext';

export default function MyApp({ Component, pageProps }: AppProps){

    return (
        <ThemeContextProvider>

            <Component {...pageProps} />    

        </ThemeContextProvider>
    );
}

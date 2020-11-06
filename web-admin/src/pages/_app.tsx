import React from 'react';
import { AppProps } from 'next/app';

import { ThemeContextProvider} from '../contexts/ThemeContext';
import { LoginLogoutContextProvider } from '../contexts/LoginLogoutContext';

export default function MyApp({ Component, pageProps }: AppProps){

    return (
        <ThemeContextProvider>
            <LoginLogoutContextProvider>

                <Component {...pageProps} />    
                
            </LoginLogoutContextProvider>
        </ThemeContextProvider>
    );
}

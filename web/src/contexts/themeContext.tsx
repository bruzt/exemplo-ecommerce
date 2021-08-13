import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/GlobalStyle';
import darkTheme from '../styles/darkTheme';
import lightTheme from '../styles/lightTheme';

interface IThemeHook {
    changeThemeTo: (theme: "dark" | "light") => void;
    getTheme: typeof darkTheme;
}

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const Context = createContext({} as IThemeHook);

export function ThemeContextProvider({ children }: ThemeContextProviderProps){
    
    const [getTheme, setTheme] = useState(darkTheme);

    useEffect(() => {
        const theme = localStorage.getItem('theme');

        if(theme) changeThemeTo(theme);
    }, []);

    function changeThemeTo(theme: string){

        if(theme === 'dark') {
            localStorage.setItem('theme', 'dark');
            setTheme(darkTheme);
        }

        if(theme === 'light') {
            localStorage.setItem('theme', 'light');
            setTheme(lightTheme);
        }
    }
    
    return (
        <Context.Provider 
            value={{ 
                changeThemeTo,
                getTheme
            }}
        >
            <ThemeProvider theme={getTheme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </Context.Provider>
    );
}

export function useTheme() {

    const context = useContext(Context);

    return context;
}

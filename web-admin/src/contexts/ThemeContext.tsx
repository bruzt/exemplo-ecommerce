import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import darkTheme from '../styles/darkTheme';
import lightTheme from '../styles/darkTheme';

interface IThemeHook {
    changeThemeTo: (theme: "dark" | "light") => void
}

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const Context = createContext({});

export function ThemeContextProvider({ children }: ThemeContextProviderProps){
    
    const [getTheme, setTheme] = useState(darkTheme);

    function changeThemeTo(theme: string){

        if(theme === 'dark') setTheme(darkTheme);
        if(theme === 'light') setTheme(lightTheme);
    }
    
    return (
        <Context.Provider 
            value={{ 
                changeThemeTo,
            }}
        >
            <ThemeProvider theme={getTheme}>
                {children}
            </ThemeProvider>
        </Context.Provider>
    );
}

export function useTheme() {

    const context = useContext(Context) as IThemeHook;

    return context;
}

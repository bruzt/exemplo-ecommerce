import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';
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

    function changeThemeTo(theme: string){

        if(theme === 'dark') setTheme(darkTheme);
        if(theme === 'light') setTheme(lightTheme);
    }
    
    return (
        <Context.Provider 
            value={{ 
                changeThemeTo,
                getTheme
            }}
        >
            <ThemeProvider theme={getTheme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </Context.Provider>
    );
}

export function useTheme() {

    const context = useContext(Context);

    return context;
}

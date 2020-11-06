import React from 'react';

import { Container } from './styles';

import { useTheme } from '../../contexts/ThemeContext';
import { useLoginLogout } from '../../contexts/LoginLogoutContext';

export default function Header() {

    const themeContext = useTheme();
    const loginLogoutContext = useLoginLogout();
    
    return (
        <Container>

            <div>
                {themeContext.getTheme.title == 'dark'
                    ? (
                        <button 
                            type='button'
                            onClick={() => themeContext.changeThemeTo('light')}
                        >
                            Claro
                        </button>
                    ) : (
                        <button 
                            type='button'
                            onClick={() => themeContext.changeThemeTo('dark')}
                        >
                            Escuro
                        </button>
                    )
                }

            </div>

            <div>
                <button type='button' onClick={() => loginLogoutContext.logout()}>
                    Logout
                </button>
            </div>

        </Container>
    );
}

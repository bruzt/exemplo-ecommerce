import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import router from 'next/router';

import Header from './';
import { ThemeContextProvider } from '../../contexts/ThemeContext';
import { LoginLogoutContextProvider } from '../../contexts/LoginLogoutContext';

jest.mock('next/router', () => require('next-router-mock'));

describe('Header Tests', () => {

    it('should change theme to light', async () => {

        const { getByTestId } = render(
            <ThemeContextProvider>
                <Header />
            </ThemeContextProvider>
        );

        const lightThemeButton = getByTestId('light-theme-button');

        const backgroundColorBeforeClick = window.getComputedStyle(lightThemeButton).backgroundColor;

        fireEvent.click(lightThemeButton);

        const backgroundColorAfterClick = window.getComputedStyle(lightThemeButton).backgroundColor;

        expect(backgroundColorBeforeClick).not.toBe(backgroundColorAfterClick);
    });

    it('should change theme back to dark', async () => {

        const { getByTestId } = render(
            <ThemeContextProvider>

                <Header />

            </ThemeContextProvider>
        );

        const lightThemeButton = getByTestId('light-theme-button');

        const backgroundColorBeforeClicks = window.getComputedStyle(lightThemeButton).backgroundColor;

        fireEvent.click(lightThemeButton);

        const darkThemeButton = getByTestId('dark-theme-button');

        fireEvent.click(darkThemeButton);

        const backgroundColorAfterClicks = window.getComputedStyle(lightThemeButton).backgroundColor;

        expect(backgroundColorBeforeClicks).toBe(backgroundColorAfterClicks);
    });

    it('should log out', async () => {

        const { getByTestId } = render(
            <ThemeContextProvider>
                <LoginLogoutContextProvider>
                    <Header />
                </LoginLogoutContextProvider>
            </ThemeContextProvider>
        );

        const logoutButton = getByTestId('logout-button');

        fireEvent.click(logoutButton);

        expect(router.pathname).toBe('/');
    });
});
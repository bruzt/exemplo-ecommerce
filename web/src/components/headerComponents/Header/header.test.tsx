import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

jest.mock('next/router', () => require('next-router-mock'));

import Header from './';
import { ThemeContextProvider } from '../../../contexts/themeContext';
import { CartContextProvider } from '../../../contexts/cartContext';
import { FilterBarContextProvider } from '../../../contexts/filterBarContext';
import { UserContextProvider } from '../../../contexts/userContext';
import { fakeUser } from '../../../testUtils/fakeData';
import api from '../../../services/api';

describe('Header Tests', () => {

    beforeAll(() => {
        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, []);
    });

    it('should open login modal', async () => {

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider>
                            <Header />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));
            
        const loginButton = getByTestId('login-button');

        fireEvent.click(loginButton);

        const loginModal = queryByTestId('login-modal');

        expect(loginModal).toBeInTheDocument();
    });

    it('should render user dropdown on user logged', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider _testUser={fakeUser} _testLogin={true}>
                            <Header />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));
            
        const userDropdown = queryByTestId('dropdown-user');
        const loginButton = queryByTestId('login-button');

        expect(userDropdown).toBeInTheDocument();
        expect(loginButton).not.toBeInTheDocument();
    });

    it('should go to account menu', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider _testUser={fakeUser} _testLogin={true}>
                            <Header />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));
            
        const userDropdown = queryByTestId('go-to-account');
        
        fireEvent.click(userDropdown);
    });

    it('should logout', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider _testUser={fakeUser} _testLogin={true}>
                            <Header />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));
            
        const logout = queryByTestId('logout');
        
        fireEvent.click(logout);

        const userDropdown = queryByTestId('dropdown-user');
        const loginButton = queryByTestId('login-button');

        expect(loginButton).toBeInTheDocument();
        expect(userDropdown).not.toBeInTheDocument();
    });
});
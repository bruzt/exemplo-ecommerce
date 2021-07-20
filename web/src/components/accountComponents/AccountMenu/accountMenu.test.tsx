import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AccountMenu from './';
import { ThemeContextProvider } from '../../../contexts/themeContext';
import { CartContextProvider } from '../../../contexts/cartContext';
import { FilterBarContextProvider } from '../../../contexts/filterBarContext';
import { UserContextProvider } from '../../../contexts/userContext';
import { fakeUser, fakeAxiosUfs } from '../../../testUtils/fakeData';
import api from '../../../services/api';
 
jest.mock('next/router', () => require('next-router-mock'));

describe('Account General Tests', () => {

    beforeAll( () => {
        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, []);
        apiMock.onGet('/orders?limit=5&offset=0').reply(200, { count: 0, orders: []});
    });

    it('should render Account Data Component on menu click', async () => {

        const { getByTestId, queryByTestId } = await waitFor( () => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider _testUser={fakeUser}>
                            <AccountMenu />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const accountDataMenu = getByTestId('account-data-menu') as HTMLAnchorElement;
        const addressesMenu = getByTestId('addresses-menu') as HTMLAnchorElement;
        const myShoppingMenu = getByTestId('my-shopping-menu') as HTMLAnchorElement;
        
        await waitFor( () => fireEvent.click(accountDataMenu));
        
        const accountDataComponent = queryByTestId('account-data-component');
        const addressesComponent = queryByTestId('addresses-component');
        const myShoppingComponent = queryByTestId('my-shopping-component');

        expect(accountDataMenu).toHaveClass('active');
        expect(addressesMenu).not.toHaveClass('active');
        expect(myShoppingMenu).not.toHaveClass('active');
        expect(accountDataComponent).toBeInTheDocument();
        expect(addressesComponent).not.toBeInTheDocument();
        expect(myShoppingComponent).not.toBeInTheDocument();
    });

    it('should render Addresses Component on menu click', async () => {

        const { getByTestId, queryByTestId } = await waitFor( () => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider _testUser={fakeUser}>
                            <AccountMenu />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const accountDataMenu = getByTestId('account-data-menu') as HTMLAnchorElement;
        const addressesMenu = getByTestId('addresses-menu') as HTMLAnchorElement;
        const myShoppingMenu = getByTestId('my-shopping-menu') as HTMLAnchorElement;
        
        await waitFor( () => fireEvent.click(addressesMenu)) ;
        
        const accountDataComponent = queryByTestId('account-data-component');
        const addressesComponent = queryByTestId('addresses-component');
        const myShoppingComponent = queryByTestId('my-shopping-component');

        expect(addressesMenu).toHaveClass('active');
        expect(accountDataMenu).not.toHaveClass('active');
        expect(myShoppingMenu).not.toHaveClass('active');
        expect(addressesComponent).toBeInTheDocument();
        expect(accountDataComponent).not.toBeInTheDocument();
        expect(myShoppingComponent).not.toBeInTheDocument();
    });

    it('should render My Shopping on menu click', async () => {

        const { getByTestId, queryByTestId } = await waitFor( () => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <UserContextProvider _testUser={fakeUser}>
                            <AccountMenu />
                        </UserContextProvider>
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const accountDataMenu = getByTestId('account-data-menu') as HTMLAnchorElement;
        const addressesMenu = getByTestId('addresses-menu') as HTMLAnchorElement;
        const myShoppingMenu = getByTestId('my-shopping-menu') as HTMLAnchorElement;
        
        await waitFor( () => fireEvent.click(myShoppingMenu)) ;
        
        const accountDataComponent = queryByTestId('account-data-component');
        const addressesComponent = queryByTestId('addresses-component');
        const myShoppingComponent = queryByTestId('my-shopping-component');

        expect(myShoppingMenu).toHaveClass('active');
        expect(accountDataMenu).not.toHaveClass('active');
        expect(addressesMenu).not.toHaveClass('active');
        expect(myShoppingComponent).toBeInTheDocument();
        expect(accountDataComponent).not.toBeInTheDocument();
        expect(addressesComponent).not.toBeInTheDocument();
    });
})
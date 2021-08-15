import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import ForgotPassPage from '.';
import api from '../../services/api';
import { ThemeContextProvider } from '../../contexts/themeContext';
import { CartContextProvider } from '../../contexts/cartContext';
import { FilterBarContextProvider } from '../../contexts/filterBarContext';

jest.mock('next/router', () => require('next-router-mock'));

describe('Forgot Pass Page Tests', () => {

    beforeAll(() => {
        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, []);
        apiMock.onPut('/reset-password').reply(204);
    });

    it('should call api to change password', async () => {

        const spyApi = jest.spyOn(api, 'put');

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ForgotPassPage _testToken='zxcvbnmasdf' />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const passwordInput = getByTestId('password') as HTMLInputElement;
        const confirmPasswordInput = getByTestId('confirm-password') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;

        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' }});
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(1);
    });

    it('should keep "change password" button disabled - no token', async () => {

        const spyApi = jest.spyOn(api, 'put');

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ForgotPassPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const passwordInput = getByTestId('password') as HTMLInputElement;
        const confirmPasswordInput = getByTestId('confirm-password') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;

        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' }});
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
        expect(submitButton).toBeDisabled();
    });

    it('should keep "change password" button disabled - password too small', async () => {

        const spyApi = jest.spyOn(api, 'put');

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ForgotPassPage _testToken='zxcvbnmasdf' />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const passwordInput = getByTestId('password') as HTMLInputElement;
        const confirmPasswordInput = getByTestId('confirm-password') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;

        fireEvent.change(passwordInput, { target: { value: '12345' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '12345' }});
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
        expect(submitButton).toBeDisabled();
    });

    it('should keep "change password" button disabled - wrong confirm password', async () => {

        const spyApi = jest.spyOn(api, 'put');

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ForgotPassPage _testToken='zxcvbnmasdf' />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const passwordInput = getByTestId('password') as HTMLInputElement;
        const confirmPasswordInput = getByTestId('confirm-password') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;

        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '12345' }});
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
        expect(submitButton).toBeDisabled();
    });
});

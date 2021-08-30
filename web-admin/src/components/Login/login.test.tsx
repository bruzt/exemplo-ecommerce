import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import router from 'next/router';
import MockAdapter from 'axios-mock-adapter';

import Login from './';
import { ThemeContextProvider } from '../../contexts/ThemeContext';
import { LoginLogoutContextProvider } from '../../contexts/LoginLogoutContext';
import api from '../../services/api';
import { fakeJwtToken, fakeUser } from '../../testUtils/fakeData';

jest.mock('next/router', () => require('next-router-mock'));

describe('Login Tests', () => {

    it('should login', async () => {

        const apiMock = new MockAdapter(api);
        apiMock
            .onPost('/sessions').reply(200, fakeJwtToken)
            .onGet('/users/1').reply(200, fakeUser)
        ;

        const apiPostSpy = jest.spyOn(api, 'post');

        const { getByTestId } = render(
            <ThemeContextProvider>
                <LoginLogoutContextProvider>
                    <Login />
                </LoginLogoutContextProvider>
            </ThemeContextProvider>
        );

        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.test' }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(router.asPath).toBe('/admin?menu=products-list');
        expect(apiPostSpy).toBeCalledTimes(1);
    });

    it('should not login - email too small', async () => {

        const apiPostSpy = jest.spyOn(api, 'post');

        const { getByTestId } = render(
            <ThemeContextProvider>
                <LoginLogoutContextProvider>
                    <Login />
                </LoginLogoutContextProvider>
            </ThemeContextProvider>
        );

        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 't@t.t' }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(submitButton).toBeDisabled();
        expect(apiPostSpy).toBeCalledTimes(0);
    });

    it('should not login - password too small', async () => {

        const apiPostSpy = jest.spyOn(api, 'post');

        const { getByTestId } = render(
            <ThemeContextProvider>
                <LoginLogoutContextProvider>
                    <Login />
                </LoginLogoutContextProvider>
            </ThemeContextProvider>
        );

        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.test' }});
        fireEvent.change(passwordInput, { target: { value: '123' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(submitButton).toBeDisabled();
        expect(apiPostSpy).toBeCalledTimes(0);
    });

    it('should clean password input if fail to login', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onPost('/sessions').reply(400);

        const apiPostSpy = jest.spyOn(api, 'post');

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(() => true);

        const { getByTestId } = render(
            <ThemeContextProvider>
                <LoginLogoutContextProvider>
                    <Login />
                </LoginLogoutContextProvider>
            </ThemeContextProvider>
        );

        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input') as HTMLInputElement;
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.test' }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(passwordInput.value).toBe('');
        expect(apiPostSpy).toBeCalledTimes(1);
    });
});
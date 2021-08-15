import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import LoginForm from './';
import { UserContextProvider } from '../../../../contexts/userContext';
import api from '../../../../services/api';
import { fakeUser, fakeUserJwt } from '../../../../testUtils/fakeData';

describe('Login Form Tests', () => {

    it('should log in', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onPost('/sessions').reply(200, { token: fakeUserJwt });
        apiMock.onGet('/users/1').reply(200, fakeUser);

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginForm />
            </UserContextProvider>
        ));

        const emailInput = getByTestId('login-email');
        const passwordInput = getByTestId('login-password');
        const submitButton = getByTestId('login-button');

        fireEvent.change(emailInput, { target: { value: 'gg@gg.gg' }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(1);
    });

    it('should not log in - email too small', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginForm />
            </UserContextProvider>
        ));

        const emailInput = getByTestId('login-email');
        const passwordInput = getByTestId('login-password');
        const submitButton = getByTestId('login-button');

        fireEvent.change(emailInput, { target: { value: 'g@g.g' }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
        expect(submitButton).toBeDisabled();
    });

    it('should not log in - password too small', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginForm />
            </UserContextProvider>
        ));

        const emailInput = getByTestId('login-email');
        const passwordInput = getByTestId('login-password');
        const submitButton = getByTestId('login-button');

        fireEvent.change(emailInput, { target: { value: 'gg@gg.gg' }});
        fireEvent.change(passwordInput, { target: { value: '123' }});
        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
        expect(submitButton).toBeDisabled();
    });
});
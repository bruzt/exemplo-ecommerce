import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import CreateUserForm from './';
import { UserContextProvider } from '../../../../contexts/userContext';
import api from '../../../../services/api';
import { fakeCpfs, fakeUserJwt, fakeUser } from '../../../../testUtils/fakeData';

    /*beforeAll(() => {
        const apiMock = new MockAdapter(api);
        apiMock.onPost('/sessions').reply(200, { token: fakeUserJwt });
        apiMock.onGet('/users/1').reply(200, fakeUser);
        apiMock.onPost('/users').reply(201, { token: fakeUserJwt });
    });*/

describe('Create User Form Tests', () => {

    it('should create new user', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onPost('/users').reply(201, { token: fakeUserJwt });
        apiMock.onGet('/users/1').reply(200, fakeUser);

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <CreateUserForm />
            </UserContextProvider>
        ));

        const nameInput = getByTestId('login-name');
        const emailInput = getByTestId('login-email');
        const cpfInput = getByTestId('login-cpf');
        const passwordInput = getByTestId('login-password');
        const confirmPasswordInput = getByTestId('login-confirm-password');
        const submitButton = getByTestId('create-button');

        fireEvent.change(nameInput, { target: { value: 'teste user' }});
        fireEvent.change(emailInput, { target: { value: 'gg@gg.gg' }});
        fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(1);
    });

    it('should not create new user - invalid cpf', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <CreateUserForm />
            </UserContextProvider>
        ));

        const nameInput = getByTestId('login-name');
        const emailInput = getByTestId('login-email');
        const cpfInput = getByTestId('login-cpf');
        const passwordInput = getByTestId('login-password');
        const confirmPasswordInput = getByTestId('login-confirm-password');
        const submitButton = getByTestId('create-button');

        fireEvent.change(nameInput, { target: { value: 'teste user' }});
        fireEvent.change(emailInput, { target: { value: 'gg@gg.gg' }});
        fireEvent.change(cpfInput, { target: { value: '99999999999' }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
    });

    it('should not create new user - wrong confirm password', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <CreateUserForm />
            </UserContextProvider>
        ));

        const nameInput = getByTestId('login-name');
        const emailInput = getByTestId('login-email');
        const cpfInput = getByTestId('login-cpf');
        const passwordInput = getByTestId('login-password');
        const confirmPasswordInput = getByTestId('login-confirm-password');
        const submitButton = getByTestId('create-button');

        fireEvent.change(nameInput, { target: { value: 'teste user' }});
        fireEvent.change(emailInput, { target: { value: 'gg@gg.gg' }});
        fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '12345' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
    });
});
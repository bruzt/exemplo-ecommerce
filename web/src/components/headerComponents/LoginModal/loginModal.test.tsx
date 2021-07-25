import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import LoginModal from './index';
import { UserContextProvider } from '../../../contexts/userContext';
import api from '../../../services/api';
import { fakeUser, fakeUserJwt, fakeCpfs } from '../../../testUtils/fakeData';

describe('Login Modal Tests', () => {

    beforeAll(() => {
        const apiMock = new MockAdapter(api);
        apiMock.onPost('/sessions').reply(200, { token: fakeUserJwt });
        apiMock.onGet('/users/1').reply(200, fakeUser);
        apiMock.onPost('/users').reply(201, { token: fakeUserJwt });
    });

    it('should log in', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
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
                <LoginModal />
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
                <LoginModal />
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

    it('should create new user', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        const newAccountAnchor = getByTestId('create-new-account');

        fireEvent.click(newAccountAnchor);

        const nameInput = getByTestId('login-name');
        const emailInput = getByTestId('login-email');
        const cpfInput = getByTestId('login-cpf');
        const passwordInput = getByTestId('login-password');
        const confirmPasswordInput = getByTestId('login-confirm-password');
        const submitButton = getByTestId('login-button');

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
                <LoginModal />
            </UserContextProvider>
        ));

        const newAccountAnchor = getByTestId('create-new-account');

        fireEvent.click(newAccountAnchor);

        const nameInput = getByTestId('login-name');
        const emailInput = getByTestId('login-email');
        const cpfInput = getByTestId('login-cpf');
        const passwordInput = getByTestId('login-password');
        const confirmPasswordInput = getByTestId('login-confirm-password');
        const submitButton = getByTestId('login-button');

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
                <LoginModal />
            </UserContextProvider>
        ));

        const newAccountAnchor = getByTestId('create-new-account');

        fireEvent.click(newAccountAnchor);

        const nameInput = getByTestId('login-name');
        const emailInput = getByTestId('login-email');
        const cpfInput = getByTestId('login-cpf');
        const passwordInput = getByTestId('login-password');
        const confirmPasswordInput = getByTestId('login-confirm-password');
        const submitButton = getByTestId('login-button');

        fireEvent.change(nameInput, { target: { value: 'teste user' }});
        fireEvent.change(emailInput, { target: { value: 'gg@gg.gg' }});
        fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] }});
        fireEvent.change(passwordInput, { target: { value: '123456' }});
        fireEvent.change(confirmPasswordInput, { target: { value: '12345' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(spyApi).toBeCalledTimes(0);
    });

    it('should go back to login', async () => {

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        let newAccountAnchor = getByTestId('create-new-account');
        
        fireEvent.click(newAccountAnchor);

        const backToLoginAnchor = getByTestId('back-to-login');

        fireEvent.click(backToLoginAnchor);

        newAccountAnchor = getByTestId('create-new-account');

        expect(newAccountAnchor).toBeInTheDocument();
    });

    it('should send forgot password', async () => {

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        const forgotPasswordAnchor = getByTestId('forgot-password');
        
        fireEvent.click(forgotPasswordAnchor);

        const forgotPasswordComponent = getByTestId('forgot-password-component');

        expect(forgotPasswordComponent).toBeInTheDocument();
    });
});
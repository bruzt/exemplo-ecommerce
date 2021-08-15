import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoginModal from './index';
import { UserContextProvider } from '../../../../contexts/userContext';

describe('Login Modal Tests', () => {

    it('should render login form by default', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        const loginForm = queryByTestId('login-form');
        const createUserForm = queryByTestId('create-user-form');
        const forgotPasswordForm = queryByTestId('forgot-password-form');

        const createNewAccountAnchor = queryByTestId('create-new-account');
        const forgotPasswordAnchor = queryByTestId('forgot-password');
        const backToLoginAnchor = queryByTestId('back-to-login');

        expect(loginForm).toBeInTheDocument();
        expect(createUserForm).not.toBeInTheDocument();
        expect(forgotPasswordForm).not.toBeInTheDocument();

        expect(createNewAccountAnchor).toBeInTheDocument();
        expect(forgotPasswordAnchor).toBeInTheDocument();
        expect(backToLoginAnchor).not.toBeInTheDocument();
    });

    it('should render create user form', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        const createNewAccountAnchor = queryByTestId('create-new-account');

        fireEvent.click(createNewAccountAnchor);

        const createUserForm = queryByTestId('create-user-form');
        const loginForm = queryByTestId('login-form');
        const forgotPasswordForm = queryByTestId('forgot-password-form');

        const forgotPasswordAnchor = queryByTestId('forgot-password');
        const backToLoginAnchor = queryByTestId('back-to-login');

        expect(createUserForm).toBeInTheDocument();
        expect(loginForm).not.toBeInTheDocument();
        expect(forgotPasswordForm).not.toBeInTheDocument();

        expect(createNewAccountAnchor).not.toBeInTheDocument();
        expect(forgotPasswordAnchor).not.toBeInTheDocument();
        expect(backToLoginAnchor).toBeInTheDocument();
    });

    it('should render forgot password form', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        const forgotPasswordAnchor = queryByTestId('forgot-password');
        
        fireEvent.click(forgotPasswordAnchor);
        
        const loginForm = queryByTestId('login-form');
        const createUserForm = queryByTestId('create-user-form');
        const forgotPasswordForm = queryByTestId('forgot-password-form');
        
        const createNewAccountAnchor = queryByTestId('create-new-account');
        const backToLoginAnchor = queryByTestId('back-to-login');

        expect(createUserForm).not.toBeInTheDocument();
        expect(loginForm).not.toBeInTheDocument();
        expect(forgotPasswordForm).toBeInTheDocument();

        expect(createNewAccountAnchor).not.toBeInTheDocument();
        expect(forgotPasswordAnchor).not.toBeInTheDocument();
        expect(backToLoginAnchor).toBeInTheDocument();
    });

    it('should go back to login form', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <UserContextProvider>
                <LoginModal />
            </UserContextProvider>
        ));

        let createNewAccountAnchor = queryByTestId('create-new-account');
        
        fireEvent.click(createNewAccountAnchor);
        
        const backToLoginAnchor = queryByTestId('back-to-login');
        
        fireEvent.click(backToLoginAnchor);
        
        const loginForm = queryByTestId('login-form');
        const createUserForm = queryByTestId('create-user-form');
        const forgotPasswordForm = queryByTestId('forgot-password-form');
        
        createNewAccountAnchor = queryByTestId('create-new-account');
        const forgotPasswordAnchor = queryByTestId('forgot-password');

        expect(loginForm).toBeInTheDocument();
        expect(createUserForm).not.toBeInTheDocument();
        expect(forgotPasswordForm).not.toBeInTheDocument();

        expect(createNewAccountAnchor).toBeInTheDocument();
        expect(forgotPasswordAnchor).toBeInTheDocument();
        expect(backToLoginAnchor).not.toBeInTheDocument();
    });

    /*
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
    });*/
});
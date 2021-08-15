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
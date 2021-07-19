import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import AccountGeneral from './';
import { UserContextProvider } from '../../../contexts/userContext';
import { fakeUser } from '../../../testUtils/fakeData';
import api from '../../../services/api';

describe('Account General Tests', () => {

    beforeAll( () => {
        const apiMock = new MockAdapter(api);
        apiMock.onPut('/users').reply(200, fakeUser);
    });

    it('should update user info', async () => {

        const spyApi = jest.spyOn(api, 'put');
        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const nameInput = getByTestId('name') as HTMLInputElement;
        const emailInput = getByTestId('email') as HTMLInputElement;
        const cpfInput = getByTestId('cpf') as HTMLInputElement;
        const currentPasswordInput = getByTestId('current-password') as HTMLInputElement;
        const newPasswordInput = getByTestId('new-password') as HTMLInputElement;
        const confirmNewPasswordInput = getByTestId('confirm-new-password') as HTMLInputElement;
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(nameInput, { target: { value: 'test name' }});
        fireEvent.change(emailInput, { target: { value: 'aaa@bbb.com' }});
        fireEvent.change(cpfInput, { target: { value: '11111111111' }});
        fireEvent.change(currentPasswordInput, { target: { value: '123456' }});
        fireEvent.change(newPasswordInput, { target: { value: '1234567' }});
        fireEvent.change(confirmNewPasswordInput, { target: { value: '1234567' }});
        await waitFor( () => fireEvent.click(saveButton));

        expect(nameInput.value).toBe('test name');
        expect(emailInput.value).toBe('aaa@bbb.com');
        expect(cpfInput.value.replace(/\.|-/g, '')).toBe('11111111111');
        expect(currentPasswordInput.value).toBe('');
        expect(newPasswordInput.value).toBe('');
        expect(confirmNewPasswordInput.value).toBe('');
        expect(spyApi).toBeCalledTimes(1);
    });

    it('should set save button disabled - name too small', async () => {

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const nameInput = getByTestId('name') as HTMLInputElement;
        
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(nameInput, { target: { value: 'tt' }});

        expect(saveButton).toBeDisabled();
    });

    it('should set save button disabled - email too small', async () => {

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const emailInput = getByTestId('email') as HTMLInputElement;
        
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(emailInput, { target: { value: 'a@a.aa' }});

        expect(saveButton).toBeDisabled();
    });

    it('should set save button disabled - cpf too small', async () => {

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const cpfInput = getByTestId('cpf') as HTMLInputElement;
        
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(cpfInput, { target: { value: '123.456-78' }});

        expect(saveButton).toBeDisabled();
    });

    it('should set save button disabled - current password too small', async () => {

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const currentPasswordInput = getByTestId('current-password') as HTMLInputElement;
        
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(currentPasswordInput, { target: { value: '123' }});

        expect(saveButton).toBeDisabled();
    });

    it('should set save button disabled - new password too small', async () => {

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const currentPasswordInput = getByTestId('current-password') as HTMLInputElement;
        const newPasswordInput = getByTestId('new-password') as HTMLInputElement;
        
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(currentPasswordInput, { target: { value: '123456' }});
        fireEvent.change(newPasswordInput, { target: { value: '123' }});

        expect(saveButton).toBeDisabled();
    });

    it('should set save button disabled - wrong confirm password', async () => {

        const { getByTestId } = render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountGeneral />
            </UserContextProvider>
        );

        const currentPasswordInput = getByTestId('current-password') as HTMLInputElement;
        const newPasswordInput = getByTestId('new-password') as HTMLInputElement;
        const confirmNewPasswordInput = getByTestId('confirm-new-password') as HTMLInputElement;
        
        const saveButton = getByTestId('save-button') as HTMLButtonElement;
        
        fireEvent.change(currentPasswordInput, { target: { value: '123456' }});
        fireEvent.change(newPasswordInput, { target: { value: '1234567' }});
        fireEvent.change(confirmNewPasswordInput, { target: { value: '1234568' }});

        expect(saveButton).toBeDisabled();
    });
});
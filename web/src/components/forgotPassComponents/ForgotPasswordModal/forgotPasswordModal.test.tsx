import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import ForgotPasswordModal from './';
import api from '../../../services/api';

describe('Forgot Password Modal Tests', () => {

    beforeAll(() => {
        const apiMock = new MockAdapter(api);
        //apiMock.onGet('/categories').reply(200, []);
        apiMock.onPost('/reset-password').reply(204);
    });

    it('should call api to send email', async () => {

        const spyApi = jest.spyOn(api, 'post');

        function setModal(value = true) { return value; }

        const { getByTestId } = render(<ForgotPasswordModal setForgotPassword={setModal} />);

        const emailInput = getByTestId('forgot-pass-input') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;

        fireEvent.change(emailInput, { target: { value: 'test@test.test' }})

        await waitFor(() => fireEvent.click(submitButton));
        
        expect(emailInput).not.toBeDisabled();
        expect(spyApi).toBeCalledTimes(1);
    });

    it('should keep "send" button disabled - e-mail too small', async () => {

        const spyApi = jest.spyOn(api, 'post');

        function setModal(value = true) { return value; }

        const { getByTestId } = render(<ForgotPasswordModal setForgotPassword={setModal} />);

        const emailInput = getByTestId('forgot-pass-input') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;
        
        fireEvent.change(emailInput, { target: { value: 't@t.t' }});

        await waitFor(() => fireEvent.click(submitButton));
        
        expect(submitButton).toBeDisabled();
        expect(spyApi).toBeCalledTimes(0);
    });

    it('should go back to login modal', async () => {

        let modalVar = true;
        function setModal(value = true) { modalVar = value }

        const { getByTestId } = render(<ForgotPasswordModal setForgotPassword={setModal} />);

        const backAnchor = getByTestId('back-anchor') as HTMLAnchorElement;

        fireEvent.click(backAnchor);
        
        expect(modalVar).toBe(false);
    });
});
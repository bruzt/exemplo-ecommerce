import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import ForgotPasswordModal from '.';
import api from '../../../../services/api';

describe('Forgot Password Form Tests', () => {
    
    it('should call api to send email', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onPost('/reset-password').reply(204);

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = render(<ForgotPasswordModal />);

        const emailInput = getByTestId('forgot-pass-input') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;

        fireEvent.change(emailInput, { target: { value: 'test@test.test' }})

        await waitFor(() => fireEvent.click(submitButton));
        
        expect(emailInput).not.toBeDisabled();
        expect(spyApi).toBeCalledTimes(1);
    });

    it('should keep "send" button disabled - e-mail too small', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = render(<ForgotPasswordModal />);

        const emailInput = getByTestId('forgot-pass-input') as HTMLInputElement;
        const submitButton = getByTestId('submit-button') as HTMLButtonElement;
        
        fireEvent.change(emailInput, { target: { value: 't@t.t' }});

        await waitFor(() => fireEvent.click(submitButton));
        
        expect(submitButton).toBeDisabled();
        expect(spyApi).toBeCalledTimes(0);
    });
});
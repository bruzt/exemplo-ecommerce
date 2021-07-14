import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AccountAddresses from './';
import { UserContextProvider } from '../../../contexts/userContext';

const fakeUser = {
    id: 1,
    name: 'Fake user',
    email: 'fake@fake.com',
    cpf: '99999999999',
    admin: false,
    addresses: [{
        id: 1,
        street: 'rua foo',
        number: '14b',
        neighborhood: 'bairro bar',
        city: 'baz',
        state: 'foobar',
        zipcode: '88888888',
    }]
};

describe('Account Addresses Tests', () => {

    it('should fill the address form', () => {

        const { container } = render(
            <UserContextProvider testUser={fakeUser}>
                <AccountAddresses />
            </UserContextProvider>
        );

        const streetInput: HTMLInputElement = container.querySelector('#street');
        const numberInput: HTMLInputElement = container.querySelector('#number');
        const neighborhoodInput: HTMLInputElement = container.querySelector('#neighborhood');
        const cityInput: HTMLInputElement = container.querySelector('#city');
        const ufInput: HTMLInputElement = container.querySelector('#uf');
        const zipcodeInput: HTMLInputElement = container.querySelector('#zipcode');

        fireEvent.change(streetInput, { target: { value: 'rua bla' } });
        fireEvent.change(numberInput, { target: { value: '5a' } });
        fireEvent.change(neighborhoodInput, { target: { value: 'bairro gg' } });
        fireEvent.change(zipcodeInput, { target: { value: '12240650' } });

        setTimeout(() => {
            fireEvent.change(ufInput, { target: { value: 'sp' } });
            fireEvent.change(cityInput, { target: { value: 'Limeira' } });
    
            expect(streetInput.value).toBe('rua bla');
            expect(numberInput.value).toBe('5a');
            expect(neighborhoodInput.value).toBe('bairro gg');
            expect(ufInput.value).toBe('sp');
            expect(cityInput.value).toBe('Limeira');
            expect(zipcodeInput.value).toBe('12240650');
        }, 1000);
    })
});
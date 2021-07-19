import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AccountAddresses from './';
import { UserContextProvider } from '../../../contexts/userContext';
import api from '../../../services/api';

const fakeUser = {
    id: 1,
    name: 'Fake user',
    email: 'fake@fake.com',
    cpf: '99999999999',
    admin: false,
    addresses: []
};

const fakeAddress = {
    id: 1,
    street: 'rua foo',
    number: '14b',
    neighborhood: 'bairro bar',
    city: 'baz',
    state: 'foobar',
    zipcode: '88888888',
};

const fakeAxiosUfs = [{
    "id": 35,
    "sigla": "SP",
    "nome": "São Paulo",
    "regiao": {
        "id": 3,
        "sigla": "SE",
        "nome": "Sudeste"
    },
}];

const fakeAxiosCitys = [{
    "id": 3526902,
    "nome": "Limeira",
    "microrregiao": {
        "id": 35027,
        "nome": "Limeira",
        "mesorregiao": {
            "id": 3506,
            "nome": "Piracicaba",
            "UF": {
                "id": 35,
                "sigla": "SP",
                "nome": "São Paulo",
                "regiao": {
                    "id": 3,
                    "sigla": "SE",
                    "nome": "Sudeste"
                }
            }
        }
    }
}];

describe('Account Addresses Tests', () => {

    beforeAll( () => {
        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const apiMock = new MockAdapter(api);
        apiMock.onPost('/addresses').reply(201, fakeAddress);
        apiMock.onDelete('/addresses/1').reply(204);
    });

    it('should not have address card', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountAddresses />
            </UserContextProvider>
        ));

        const shouldNotHaveCard = queryByTestId('address-card');

        expect(shouldNotHaveCard).toBe(null);
    });

    it('should have address card', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <UserContextProvider _testUser={{
                ...fakeUser,
                addresses: [fakeAddress],
            }}>
                <AccountAddresses />
            </UserContextProvider>
        ));

        const shouldHaveCard = queryByTestId('address-card');

        expect(shouldHaveCard).toBeInTheDocument();
    });

    it('should fill address form', async () => {

        const spyAxios = jest.spyOn(axios, 'get');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountAddresses />
            </UserContextProvider>
        ));

        const streetInput = getByTestId('street') as HTMLInputElement;
        const numberInput = getByTestId('number') as HTMLInputElement;
        const neighborhoodInput = getByTestId('neighborhood') as HTMLInputElement;
        const cityInput = getByTestId('city') as HTMLInputElement;
        const ufInput = getByTestId('uf') as HTMLInputElement;
        const zipcodeInput = getByTestId('zipcode') as HTMLInputElement;

        fireEvent.change(streetInput, { target: { value: 'rua bla' } });
        fireEvent.change(numberInput, { target: { value: '5a' } });
        fireEvent.change(neighborhoodInput, { target: { value: 'bairro gg' } });
        fireEvent.change(zipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.change(ufInput, { target: { value: 'SP' } }));
        fireEvent.change(cityInput, { target: { value: 'Limeira' } });

        expect(streetInput.value).toBe('rua bla');
        expect(numberInput.value).toBe('5a');
        expect(neighborhoodInput.value).toBe('bairro gg');
        expect(ufInput.value).toBe('SP');
        expect(cityInput.value).toBe('Limeira');
        expect(zipcodeInput.value).toBe('12240-650');
        expect(spyAxios).toBeCalledTimes(2);
    });

    it('should add an address', async () => {

        const spyApi = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider _testUser={fakeUser}>
                <AccountAddresses />
            </UserContextProvider>
        ));

        const streetInput = getByTestId('street') as HTMLInputElement;
        const numberInput = getByTestId('number') as HTMLInputElement;
        const neighborhoodInput = getByTestId('neighborhood') as HTMLInputElement;
        const cityInput = getByTestId('city') as HTMLInputElement;
        const ufInput = getByTestId('uf') as HTMLInputElement;
        const zipcodeInput = getByTestId('zipcode') as HTMLInputElement;
        const submitAddressButton = getByTestId('submit-address-button') as HTMLButtonElement;

        fireEvent.change(streetInput, { target: { value: 'rua bla' } });
        fireEvent.change(numberInput, { target: { value: '5a' } });
        fireEvent.change(neighborhoodInput, { target: { value: 'bairro gg' } });
        fireEvent.change(zipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.change(ufInput, { target: { value: 'SP' } }));
        fireEvent.change(cityInput, { target: { value: 'Limeira' } });
        await waitFor(() => fireEvent.click(submitAddressButton));

        expect(streetInput.value).toBe('');
        expect(numberInput.value).toBe('');
        expect(neighborhoodInput.value).toBe('');
        expect(ufInput.value).toBe('0');
        expect(cityInput.value).toBe('0');
        expect(zipcodeInput.value).toBe('');
        expect(spyApi).toBeCalledTimes(1);
    });

    it('should delete address', async () => {

        const spyApi = jest.spyOn(api, 'delete');
        const confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => true));

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider _testUser={{
                ...fakeUser,
                addresses: [fakeAddress]
            }}>
                <AccountAddresses />
            </UserContextProvider>
        ));

        const addressToBeRemoved = queryByTestId('address-card');

        const removeAddressButton = getByTestId('remove-address-button') as HTMLButtonElement;
        await waitFor(() => fireEvent.click(removeAddressButton));

        const removedAddress = queryByTestId('address-card');
        
        expect(spyApi).toBeCalledTimes(1);
        expect(confirmSpy).toBeCalledTimes(1);
        expect(addressToBeRemoved).not.toBeNull();
        expect(removedAddress).toBe(null);
    });
});

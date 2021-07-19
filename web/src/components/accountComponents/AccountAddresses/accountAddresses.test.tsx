import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AccountAddresses from './';
import { UserContextProvider } from '../../../contexts/userContext';

const fakeUser = {
    id: 1,
    name: 'Fake user',
    email: 'fake@fake.com',
    cpf: '99999999999',
    admin: false,
    addresses: []
};

const fakeAddresses = [{
    id: 1,
    street: 'rua foo',
    number: '14b',
    neighborhood: 'bairro bar',
    city: 'baz',
    state: 'foobar',
    zipcode: '88888888',
}];

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
        const mock = new MockAdapter(axios);
        mock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        mock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);
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
                addresses: fakeAddresses,
            }}>
                <AccountAddresses />
            </UserContextProvider>
        ));

        const souldHaveCard = queryByTestId('address-card');

        expect(souldHaveCard).toBeInTheDocument();
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
        //const submitAddressButton = getByTestId('submit-address-button') as HTMLButtonElement;

        fireEvent.change(streetInput, { target: { value: 'rua bla' } });
        fireEvent.change(numberInput, { target: { value: '5a' } });
        fireEvent.change(neighborhoodInput, { target: { value: 'bairro gg' } });
        fireEvent.change(zipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.change(ufInput, { target: { value: 'SP' } }));
        fireEvent.change(cityInput, { target: { value: 'Limeira' } });
        //fireEvent.click(submitAddressButton);

        expect(streetInput.value).toBe('rua bla');
        expect(numberInput.value).toBe('5a');
        expect(neighborhoodInput.value).toBe('bairro gg');
        expect(ufInput.value).toBe('SP');
        expect(cityInput.value).toBe('Limeira');
        expect(zipcodeInput.value).toBe('12240-650');
        expect(spyAxios).toBeCalledTimes(2);
    });
});
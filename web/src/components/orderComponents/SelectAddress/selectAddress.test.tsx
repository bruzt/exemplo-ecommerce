import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import SelectAddress from './';
import { UserContextProvider } from '../../../contexts/userContext';
import { CartContextProvider } from '../../../contexts/cartContext';
import { OrderContextProvider } from '../../../contexts/orderContext';
import api from '../../../services/api';
import { fakeUser, fakeCartItem, fakeFreightPrice, fakeAddress, fakeAxiosUfs, fakeAxiosCitys } from '../../../testUtils/fakeData';

describe('Select Address Tests', () => {

    it('should select valid address', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'sedex'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addressCard = getByTestId('address-card');
        const addressCardAnchor = getByTestId('address-card-anchor');
        const selectAddrButton = getByTestId('select-addr-button');
        
        fireEvent.click(addressCardAnchor);
        fireEvent.click(selectAddrButton);

        expect(addressCard).toHaveClass('selected');
        expect(addressCard).not.toHaveClass('disabled');
        expect(selectAddrButton).not.toBeDisabled();
    });

    it('should select an invalid address', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'sedex'}
                    _testZipCode={'99999-999'}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addressCard = getByTestId('address-card');
        const addressCardAnchor = getByTestId('address-card-anchor');
        const selectAddrButton = getByTestId('select-addr-button');
        
        fireEvent.click(addressCardAnchor);

        expect(addressCard).toHaveClass('selected');
        expect(addressCard).toHaveClass('disabled');
        expect(selectAddrButton).toBeDisabled();
    });

    it('should remove an address', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);

        const confirmMock = jest.spyOn(window, 'confirm');
        confirmMock.mockImplementation(jest.fn(() => true));

        const { getByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'sedex'}
                    _testZipCode={'99999-999'}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));

        const apiMock = new MockAdapter(api);
        apiMock.onDelete('/addresses/1').reply(204);
        
        const addressCard = getByTestId('address-card');
        const removeAddrButton = getByTestId('remove-addr-button');
        
        await waitFor(() => fireEvent.click(removeAddrButton));

        expect(addressCard).not.toBeInTheDocument();
    });

    it('should render add address form on click', async () => {

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider _testLogin={true} _testUser={fakeUser}>
                <CartContextProvider _testCartItems={[fakeCartItem]} _testFreightPrice={fakeFreightPrice} _testFreightSelected={'sedex'}>
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));

        const addAddrButton = getByTestId('add-addr-button');
        const beforeClick = queryByTestId('add-addr-form');

        fireEvent.click(addAddrButton);

        const afterClick = queryByTestId('add-addr-form');

        expect(beforeClick).not.toBeInTheDocument();
        expect(afterClick).toBeInTheDocument();
    });

    it('should add an address', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={fakeUser}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));

        const apiMock = new MockAdapter(api);
        apiMock.onPost('/addresses').reply(200, fakeAddress);

        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        const cityInput = getByTestId('city-input');
        const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'rua foo' }});
        fireEvent.change(numberInput, { target: { value: '99' }});
        fireEvent.change(districtInput, { target: { value: 'bairro bar' }});
        await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '12240650' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addressCard).toBeInTheDocument();
    });

    it('should not add an address - street too small', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        const cityInput = getByTestId('city-input');
        const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'r' }});
        fireEvent.change(numberInput, { target: { value: '99' }});
        fireEvent.change(districtInput, { target: { value: 'bairro bar' }});
        await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '12240650' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addAddrSubmitButton).toBeDisabled();
        expect(addressCard).not.toBeInTheDocument();
    });

    it('should not add an address - number too small', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        const cityInput = getByTestId('city-input');
        const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'rua foo' }});
        fireEvent.change(numberInput, { target: { value: '' }});
        fireEvent.change(districtInput, { target: { value: 'bairro bar' }});
        await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '12240650' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addAddrSubmitButton).toBeDisabled();
        expect(addressCard).not.toBeInTheDocument();
    });

    it('should not add an address - neighborhood too small', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        const cityInput = getByTestId('city-input');
        const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'rua foo' }});
        fireEvent.change(numberInput, { target: { value: '99' }});
        fireEvent.change(districtInput, { target: { value: 'b' }});
        await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '12240650' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addAddrSubmitButton).toBeDisabled();
        expect(addressCard).not.toBeInTheDocument();
    });

    it('should not add an address - state not selected', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        const cityInput = getByTestId('city-input');
        //const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'rua foo' }});
        fireEvent.change(numberInput, { target: { value: '99' }});
        fireEvent.change(districtInput, { target: { value: 'bairro bar' }});
        //await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '12240650' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addAddrSubmitButton).toBeDisabled();
        expect(addressCard).not.toBeInTheDocument();
    });

    it('should not add an address - city not selected', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        //const cityInput = getByTestId('city-input');
        const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'rua foo' }});
        fireEvent.change(numberInput, { target: { value: '99' }});
        fireEvent.change(districtInput, { target: { value: 'bairro bar' }});
        await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        //fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '12240650' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addAddrSubmitButton).toBeDisabled();
        expect(addressCard).not.toBeInTheDocument();
    });

    it('should not add an address - zipcode too small', async () => {

        const axiosMock = new MockAdapter(axios);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados').reply(200, fakeAxiosUfs);
        axiosMock.onGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios').reply(200, fakeAxiosCitys);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <UserContextProvider 
                _testLogin={true} 
                _testUser={{ ...fakeUser, addresses: [] }}
            >
                <CartContextProvider 
                    _testCartItems={[fakeCartItem]} 
                    _testFreightPrice={fakeFreightPrice} 
                    _testFreightSelected={'pac'}
                    _testZipCode={fakeAddress.zipcode}
                >
                    <OrderContextProvider _testOrderFlowNumber={2}>
                        <SelectAddress />
                    </OrderContextProvider>
                </CartContextProvider>
            </UserContextProvider>
        ));
        
        const addAddrButton = getByTestId('add-addr-button');

        fireEvent.click(addAddrButton);

        const streetInput = getByTestId('street-input');
        const numberInput = getByTestId('number-input');
        const districtInput = getByTestId('district-input');
        const cityInput = getByTestId('city-input');
        const stateInput = getByTestId('state-input');
        const zipcodeInput = getByTestId('zipcode-input');
        const addAddrSubmitButton = getByTestId('add-addr-submit-button');

        fireEvent.change(streetInput, { target: { value: 'rua foo' }});
        fireEvent.change(numberInput, { target: { value: '99' }});
        fireEvent.change(districtInput, { target: { value: 'bairro bar' }});
        await waitFor(() => fireEvent.change(stateInput, { target: { value: 'SP' }}));
        fireEvent.change(cityInput, { target: { value: 'Limeira' }});
        fireEvent.change(zipcodeInput, { target: { value: '1224065' }});
        
        await waitFor(() => fireEvent.click(addAddrSubmitButton));

        const addressCard = queryByTestId('address-card');

        expect(addAddrSubmitButton).toBeDisabled();
        expect(addressCard).not.toBeInTheDocument();
    });
});
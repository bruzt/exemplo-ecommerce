import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import Cart from './';
import { CartContextProvider } from '../../../contexts/cartContext';
import { UserContextProvider } from '../../../contexts/userContext';
import { OrderContextProvider } from '../../../contexts/orderContext';
import { fakeCartItem, fakeProduct, fakeFreightPrice, fakeUser } from '../../../testUtils/fakeData';
import api from '../../../services/api';

jest.mock('next/router', () => require('next-router-mock'));

describe('Cart Tests', () => {

    it('should show that cart has no items', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <CartContextProvider>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const emptyH1 = queryByTestId('empty-h1');

        expect(emptyH1).toBeInTheDocument();
    });

    it('should show cart table when has items', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products/1').reply(200, fakeProduct);

        const { queryByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[fakeCartItem]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const emptyH1 = queryByTestId('empty-h1');
        const cartTable = queryByTestId('cart-table');

        expect(cartTable).toBeInTheDocument();
        expect(emptyH1).not.toBeInTheDocument();
    });

    it('should set product qtd equal to available', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products/1').reply(200, fakeProduct);

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[{ ...fakeCartItem, qtd: 3 }]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const cartQtd = getByTestId('cart-qtd');

        expect(cartQtd.innerHTML).toBe('2');
    });

    it('should add out-of-stock class', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products/1').reply(200, { ...fakeProduct, quantity_stock: 0 });

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[{ ...fakeCartItem, qtd: 3 }]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const productRow = getByTestId('product-row');

        expect(productRow).toHaveClass('out-of-stock');
    });

    it('should add product qtd when click on plus', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products/1').reply(200, fakeProduct);

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[{ ...fakeCartItem, qtd: 1 }]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const beforeClick = getByTestId('cart-qtd').innerHTML;
        const plusButton = getByTestId('plus-button');

        fireEvent.click(plusButton);

        const afterClick = getByTestId('cart-qtd').innerHTML;

        expect(beforeClick).toBe('1');
        expect(afterClick).toBe('2');
    });

    it('should subtract product qtd when click on minus', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products/1').reply(200, fakeProduct);

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[{ ...fakeCartItem, qtd: 2 }]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const beforeClick = getByTestId('cart-qtd').innerHTML;
        const lessButton = getByTestId('less-button');

        fireEvent.click(lessButton);

        const afterClick = getByTestId('cart-qtd').innerHTML;

        expect(beforeClick).toBe('2');
        expect(afterClick).toBe('1');
    });

    it('should remove product when click on remove button', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products/1').reply(200, fakeProduct);

        const alertSpy = jest.spyOn(window, 'confirm');
        alertSpy.mockImplementation(jest.fn(() => true));

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[{ ...fakeCartItem, qtd: 1 }]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const removeButton = getByTestId('remove-button');
        const productRow = getByTestId('product-row');

        fireEvent.click(removeButton);

        expect(productRow).not.toBeInTheDocument();
    });

    it('should get freight', async () => {

        const apiProductsMock = new MockAdapter(api);
        apiProductsMock.onGet('/products/1').reply(200, fakeProduct);

        const apiFreightSpy = jest.spyOn(api, 'post');

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[fakeCartItem]}>
                <UserContextProvider _testUser={fakeUser} _testLogin={true}>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const apiFreightMock = new MockAdapter(api);
        apiFreightMock.onPost('/freight').reply(200, fakeFreightPrice);

        const submitZipcodeInput = getByTestId('submit-zipcode-input');
        const submitZipcodeButton = getByTestId('submit-zipcode-button');

        fireEvent.change(submitZipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.click(submitZipcodeButton));

        expect(apiFreightSpy).toBeCalledTimes(1);
    });

    it('should close order if freight selected', async () => {

        const apiProductsMock = new MockAdapter(api);
        apiProductsMock.onGet('/products/1').reply(200, fakeProduct);

        const { getByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[fakeCartItem]}>
                <UserContextProvider _testUser={fakeUser} _testLogin={true}>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const apiFreightMock = new MockAdapter(api);
        apiFreightMock.onPost('/freight').reply(200, fakeFreightPrice);

        const submitZipcodeInput = getByTestId('submit-zipcode-input');
        const submitZipcodeButton = getByTestId('submit-zipcode-button');
        
        fireEvent.change(submitZipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.click(submitZipcodeButton));

        const freightRadioInput = getByTestId('freight-radio');
        fireEvent.click(freightRadioInput);

        const closeOrderButton = getByTestId('close-order-button');
        fireEvent.click(closeOrderButton);

        expect(closeOrderButton).not.toBeDisabled();
    });

    it('should not close order if freight was not selected', async () => {

        const apiProductsMock = new MockAdapter(api);
        apiProductsMock.onGet('/products/1').reply(200, fakeProduct);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[fakeCartItem]}>
                <UserContextProvider _testUser={fakeUser} _testLogin={true}>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const apiFreightMock = new MockAdapter(api);
        apiFreightMock.onPost('/freight').reply(200, fakeFreightPrice);

        const submitZipcodeInput = getByTestId('submit-zipcode-input');
        const submitZipcodeButton = getByTestId('submit-zipcode-button');
        
        fireEvent.change(submitZipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.click(submitZipcodeButton));

        const selectFreightButton = queryByTestId('select-freight-button');
        const closeOrderButton = queryByTestId('close-order-button');

        expect(selectFreightButton).toBeInTheDocument();
        expect(closeOrderButton).not.toBeInTheDocument();
    });

    it('should not close order if has no user logged in', async () => {

        const apiProductsMock = new MockAdapter(api);
        apiProductsMock.onGet('/products/1').reply(200, fakeProduct);

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <CartContextProvider _testCartItems={[fakeCartItem]}>
                <UserContextProvider>
                    <OrderContextProvider>
                        <Cart />
                    </OrderContextProvider>
                </UserContextProvider>
            </CartContextProvider>
        ));

        const apiFreightMock = new MockAdapter(api);
        apiFreightMock.onPost('/freight').reply(200, fakeFreightPrice);

        const submitZipcodeInput = getByTestId('submit-zipcode-input');
        const submitZipcodeButton = getByTestId('submit-zipcode-button');
        
        fireEvent.change(submitZipcodeInput, { target: { value: '12240650' } });
        await waitFor(() => fireEvent.click(submitZipcodeButton));

        const loginButton = queryByTestId('login-button');
        const closeOrderButton = queryByTestId('close-order-button');

        expect(loginButton).toBeInTheDocument();
        expect(closeOrderButton).not.toBeInTheDocument();
    });
});
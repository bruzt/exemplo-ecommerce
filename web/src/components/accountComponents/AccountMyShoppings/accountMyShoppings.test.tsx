import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import AccountMyShoppings from './';
import api from '../../../services/api';
import { fakeOrder } from '../../../testUtils/fakeData';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/link', () => ({ children }) => children);

describe('Account My Shoppings Tests', () => {

    beforeAll(() => {
        const apiMock = new MockAdapter(api);
        apiMock.onGet('/orders?limit=5&offset=0').reply(200, fakeOrder);
    });

    it('should render an order card', async () => {

        const { queryByTestId } = await waitFor(() => render(<AccountMyShoppings />));

        const orderCard = queryByTestId('order-card-container');

        expect(orderCard).toBeInTheDocument();
    });

    it('should open order details on click', async () => {

        const { queryByTestId } = await waitFor(() => render(<AccountMyShoppings />));

        const orderCardButton = queryByTestId('order-card-button');

        fireEvent.click(orderCardButton);

        const orderDetails = queryByTestId('order-content');

        expect(orderDetails).toBeInTheDocument();
    });

    it('should close order details on click second click', async () => {

        const { queryByTestId } = await waitFor(() => render(<AccountMyShoppings />));

        const orderCardButton = queryByTestId('order-card-button');

        fireEvent.click(orderCardButton);
        fireEvent.click(orderCardButton);

        const orderDetails = queryByTestId('order-content');

        expect(orderDetails).not.toBeInTheDocument();
    });

    it('should navigate to product page when clicking in product tab', async () => {

        const { getByTestId } = await waitFor(() => render(<AccountMyShoppings />));

        const orderCardButton = getByTestId('order-card-button');

        fireEvent.click(orderCardButton);

        const orderCardDetails = getByTestId('order-card-details');

        await waitFor(() => fireEvent.click(orderCardDetails));
    });
});
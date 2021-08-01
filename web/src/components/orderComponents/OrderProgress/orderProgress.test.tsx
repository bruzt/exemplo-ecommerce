import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import OrderProgress from './';
import { OrderContextProvider } from '../../../contexts/orderContext';

describe('Order Progress Tests', () => {

    it('should have cart active', async () => {

        const { getByTestId } = render(
            <OrderContextProvider>
                <OrderProgress />
            </OrderContextProvider>
        );

        const cartCircle = getByTestId('cart-circle');
        const addressCircle = getByTestId('address-circle');
        const paymentCircle = getByTestId('payment-circle');
        const confirmationCircle = getByTestId('confirmation-circle');
        const addressBar = getByTestId('address-bar');
        const paymentBar = getByTestId('payment-bar');
        const confirmationBar = getByTestId('confirmation-bar');

        expect(cartCircle).toHaveClass('active');

        expect(addressBar).not.toHaveClass('active');
        expect(addressCircle).not.toHaveClass('active');

        expect(paymentBar).not.toHaveClass('active');
        expect(paymentCircle).not.toHaveClass('active');

        expect(confirmationBar).not.toHaveClass('active');
        expect(confirmationCircle).not.toHaveClass('active');
    });

    it('should have address active', async () => {

        const { getByTestId } = render(
            <OrderContextProvider _testOrderFlowNumber={2}>
                <OrderProgress />
            </OrderContextProvider>
        );

        const cartCircle = getByTestId('cart-circle');
        const addressCircle = getByTestId('address-circle');
        const paymentCircle = getByTestId('payment-circle');
        const confirmationCircle = getByTestId('confirmation-circle');
        const addressBar = getByTestId('address-bar');
        const paymentBar = getByTestId('payment-bar');
        const confirmationBar = getByTestId('confirmation-bar');

        expect(cartCircle).toHaveClass('active');

        expect(addressBar).toHaveClass('active');
        expect(addressCircle).toHaveClass('active');

        expect(paymentBar).not.toHaveClass('active');
        expect(paymentCircle).not.toHaveClass('active');

        expect(confirmationBar).not.toHaveClass('active');
        expect(confirmationCircle).not.toHaveClass('active');
    });

    it('should have payment active', async () => {

        const { getByTestId } = render(
            <OrderContextProvider _testOrderFlowNumber={3}>
                <OrderProgress />
            </OrderContextProvider>
        );

        const cartCircle = getByTestId('cart-circle');
        const addressCircle = getByTestId('address-circle');
        const paymentCircle = getByTestId('payment-circle');
        const confirmationCircle = getByTestId('confirmation-circle');
        const addressBar = getByTestId('address-bar');
        const paymentBar = getByTestId('payment-bar');
        const confirmationBar = getByTestId('confirmation-bar');

        expect(cartCircle).toHaveClass('active');

        expect(addressBar).toHaveClass('active');
        expect(addressCircle).toHaveClass('active');

        expect(paymentBar).toHaveClass('active');
        expect(paymentCircle).toHaveClass('active');

        expect(confirmationBar).not.toHaveClass('active');
        expect(confirmationCircle).not.toHaveClass('active');
    });

    it('should have confirmation active', async () => {

        const { getByTestId } = render(
            <OrderContextProvider _testOrderFlowNumber={4}>
                <OrderProgress />
            </OrderContextProvider>
        );

        const cartCircle = getByTestId('cart-circle');
        const addressCircle = getByTestId('address-circle');
        const paymentCircle = getByTestId('payment-circle');
        const confirmationCircle = getByTestId('confirmation-circle');
        const addressBar = getByTestId('address-bar');
        const paymentBar = getByTestId('payment-bar');
        const confirmationBar = getByTestId('confirmation-bar');

        expect(cartCircle).toHaveClass('active');

        expect(addressBar).toHaveClass('active');
        expect(addressCircle).toHaveClass('active');

        expect(paymentBar).toHaveClass('active');
        expect(paymentCircle).toHaveClass('active');

        expect(confirmationBar).toHaveClass('active');
        expect(confirmationCircle).toHaveClass('active');
    });
});
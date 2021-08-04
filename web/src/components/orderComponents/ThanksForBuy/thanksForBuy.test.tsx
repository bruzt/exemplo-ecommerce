import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ThanksForBuy from './';
import { OrderContextProvider } from '../../../contexts/orderContext';

describe('Thanks For Buy Tests', () => {

    it('should have order id in h2 tag', async () => {

        const { queryByText } = render(
            <OrderContextProvider _testOrderFlowNumber={4} _testOrderId={1}>
                <ThanksForBuy />
            </OrderContextProvider>
        );

        const h2WithId = queryByText('Ordem de compra Nº 1');

        expect(h2WithId).toBeInTheDocument();
    });

    it('should have boleto url', async () => {

        const { queryByTestId } = render(
            <OrderContextProvider _testOrderFlowNumber={4} _testOrderId={1} _testBoletoUrl='http://boleto.test.com'>
                <ThanksForBuy />
            </OrderContextProvider>
        );

        const boletoUrlAnchor = queryByTestId('boleto-url');

        expect(boletoUrlAnchor).toBeInTheDocument();
    });

    it('should not have boleto url', async () => {

        const { queryByTestId } = render(
            <OrderContextProvider _testOrderFlowNumber={4} _testOrderId={1}>
                <ThanksForBuy />
            </OrderContextProvider>
        );

        const boletoUrlAnchor = queryByTestId('boleto-url');

        expect(boletoUrlAnchor).not.toBeInTheDocument();
    });
});
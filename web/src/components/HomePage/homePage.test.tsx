import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import HomePage from './';
import { ThemeContextProvider } from '../../contexts/themeContext';
import { CartContextProvider } from '../../contexts/cartContext';
import { FilterBarContextProvider } from '../../contexts/filterBarContext';
import api from '../../services/api';
import { fakeProducts } from '../../testUtils/fakeData';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home Page Tests', () => {

    beforeAll(() => {
        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, []);
    });

    it('should render on sale section', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <HomePage 
                            onSale={fakeProducts.products} 
                            bestSellers={[]}
                            news={[]}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const onSaleSection = queryByTestId('on-sale-section');
        const bestSellersSection = queryByTestId('best-sellers-section');
        const newsSection = queryByTestId('news-section');

        expect(onSaleSection).toBeInTheDocument();
        expect(bestSellersSection).not.toBeInTheDocument();
        expect(newsSection).not.toBeInTheDocument();
    });

    it('should render best sellers section', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <HomePage 
                            onSale={[]} 
                            bestSellers={fakeProducts.products}
                            news={[]}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const onSaleSection = queryByTestId('on-sale-section');
        const bestSellersSection = queryByTestId('best-sellers-section');
        const newsSection = queryByTestId('news-section');

        expect(bestSellersSection).toBeInTheDocument();
        expect(onSaleSection).not.toBeInTheDocument();
        expect(newsSection).not.toBeInTheDocument();
    });

    it('should render news section', async () => {

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <HomePage 
                            onSale={[]} 
                            bestSellers={[]}
                            news={fakeProducts.products}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const onSaleSection = queryByTestId('on-sale-section');
        const bestSellersSection = queryByTestId('best-sellers-section');
        const newsSection = queryByTestId('news-section');

        expect(newsSection).toBeInTheDocument();
        expect(bestSellersSection).not.toBeInTheDocument();
        expect(onSaleSection).not.toBeInTheDocument();
    });
});
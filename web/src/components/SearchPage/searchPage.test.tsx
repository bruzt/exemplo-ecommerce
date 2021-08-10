import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import router from 'next/router';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import SearchPage from './';
import { ThemeContextProvider } from '../../contexts/themeContext';
import { CartContextProvider } from '../../contexts/cartContext';
import { FilterBarContextProvider } from '../../contexts/filterBarContext';
import api from '../../services/api';
import { fakeCategories, fakeProducts } from '../../testUtils/fakeData';

jest.mock('next/router', () => require('next-router-mock'));
//const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Search Page Tests', () => {

    it('should render "nothing found"', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const nothingFound = queryByTestId('nothing-found');

        expect(nothingFound).toBeInTheDocument();
    });

    it('should search by title', async () => {

        router.query = {
            title: 'teste',
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?title=teste&offset=0&limit=16').reply(200, fakeProducts);

        const { queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const productCards = queryAllByTestId('product-card');

        expect(productCards.length).toBeGreaterThan(0);
    });

    it('should search by categoryId', async () => {

        router.query = {
            categoryId: '1',
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?category=1&offset=0&limit=16').reply(200, fakeProducts);

        const { queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const productCards = queryAllByTestId('product-card');

        expect(productCards.length).toBeGreaterThan(0);
    });

    it('should search by section', async () => {

        router.query = {
            section: 'on-sale',
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?section=on-sale&offset=0&limit=16').reply(200, fakeProducts);

        const { queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const productCards = queryAllByTestId('product-card');

        expect(productCards.length).toBeGreaterThan(0);
    });

    it('should filter by lowest-price', async () => {

        router.query = {
            title: 'test',
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?title=test&offset=0&limit=16').reply(200, fakeProducts)
        .onGet('/products?title=test&filter=lowest-price&offset=0&limit=16').reply(200, fakeProducts);

        const { getByTestId, queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const productCards = queryAllByTestId('product-card');
        const filterSelect = getByTestId('filter-select');
           
        await waitFor(() => fireEvent.change(filterSelect, { target: { value: 'lowest-price' }}));

        expect(productCards.length).toBeGreaterThan(0);
        expect(router.query.filter).toBe('lowest-price');
    });

    it('should filter by biggest-price', async () => {

        router.query = {
            title: 'test',
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?title=test&offset=0&limit=16').reply(200, fakeProducts)
        .onGet('/products?title=test&filter=biggest-price&offset=0&limit=16').reply(200, fakeProducts);

        const { getByTestId, queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const productCards = queryAllByTestId('product-card');
        const filterSelect = getByTestId('filter-select');
           
        await waitFor(() => fireEvent.change(filterSelect, { target: { value: 'biggest-price' }}));

        expect(productCards.length).toBeGreaterThan(0);
        expect(router.query.filter).toBe('biggest-price');
    });

    it('should render pagination buttons', async () => {

        router.query = {
            title: 'test',
        }

        const copyProducts = [];
        for(let i=0; i < 16; i++){
            copyProducts.push({ ...fakeProducts.products[0], id: i })
        }

        const products = {
            count: 100,
            products: copyProducts
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?title=test&offset=0&limit=16').reply(200, products)

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const paginationContainer = queryByTestId('pagination-container');

        expect(paginationContainer).toBeInTheDocument();
    });

    it('should change page', async () => {

        router.query = {
            title: 'test',
        }

        const copyProducts = [];
        for(let i=0; i < 16; i++){
            copyProducts.push({ ...fakeProducts.products[0], id: i })
        }

        const products = {
            count: 100,
            products: copyProducts
        }

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products?title=test&offset=0&limit=16').reply(200, products)
        .onGet('/products?title=test&offset=16&limit=16').reply(200, products)

        const { getAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <SearchPage />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const paginationButtons = getAllByTestId('pagination-button');

        await waitFor(() => fireEvent.click(paginationButtons[1]));

        expect(router.query.page).toBe(2);
    });
});
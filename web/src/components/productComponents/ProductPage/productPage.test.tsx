import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as router from 'next/router';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import ProductPage from './';
import { CartContextProvider } from '../../../contexts/cartContext';
import { FilterBarContextProvider } from '../../../contexts/filterBarContext';
import { ThemeContextProvider } from '../../../contexts/themeContext';
import { fakeProduct, fakeCategories } from '../../../testUtils/fakeData';
import api from '../../../services/api';

jest.mock('next/router', () => require('next-router-mock'));

describe('Product Page Tests', () => {

    it('should mount breadcrumb', async () => {

        const product = { 
            ...fakeProduct, 
            category: { 
                ...fakeProduct.category, 
                id: 3, 
                parent_id: 2 
            }
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const categoriesNames = queryAllByTestId('category-name');
        const categoriesSpacer = queryAllByTestId('category-spacer');

        expect(categoriesNames.length).toBe(3);
        expect(categoriesSpacer.length).toBe(2);
    });

    it('should click on category breadcrumb', async () => {

        const spyRouter = jest.spyOn(router, 'useRouter');

        const product = { 
            ...fakeProduct, 
            category: { 
                ...fakeProduct.category, 
                id: 3, 
                parent_id: 2 
            }
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const categoriesNames = queryAllByTestId('category-name');

        fireEvent.click(categoriesNames[0]);

        expect(spyRouter).toBeCalledTimes(17);
    });

    it('should render product page as isOnSale', async () => {

        const now = new Date().toISOString();
        const discountStart = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
        const discountEnd = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

        const product = { 
            ...fakeProduct, 
            isOnSale: true, 
            discount_percent: 10,
            dateNow: now,
            discount_datetime_start: discountStart,
            discount_datetime_end: discountEnd,
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const countdownContainer = queryByTestId('countdown-container');
        const originalPriceSpan = queryByTestId('original-price');
        const discountPercentSpan = queryByTestId('discount-percent');
        
        expect(countdownContainer).toBeInTheDocument();
        expect(originalPriceSpan).toBeInTheDocument();
        expect(discountPercentSpan).toBeInTheDocument();
    });

    it('should not render product page as isOnSale', async () => {

        const product = { 
            ...fakeProduct, 
            isOnSale: false, 
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const countdownContainer = queryByTestId('countdown-container');
        const originalPriceSpan = queryByTestId('original-price');
        const discountPercentSpan = queryByTestId('discount-percent');
        
        expect(countdownContainer).not.toBeInTheDocument();
        expect(originalPriceSpan).not.toBeInTheDocument();
        expect(discountPercentSpan).not.toBeInTheDocument();
    });

    it('should render product page as lacking', async () => {

        const product = { 
            ...fakeProduct, 
            quantity_stock: 0,
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const lackingP = queryByTestId('lacking');
        const quantityStockP = queryByTestId('quantity-stock');
       
        expect(lackingP).toBeInTheDocument();
        expect(quantityStockP.innerHTML).toBe('Disponível: 0');
    });

    it('should not let select qtd more than in stock', async () => {

        const product = { 
            ...fakeProduct, 
            quantity_stock: 2,
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const qtdInput = queryByTestId('qtd-input') as HTMLInputElement;

        fireEvent.change(qtdInput, { target: { value: '3' }});
        
        expect(qtdInput.value).toBe('2');
    });

    it('should not let select qtd less than zero', async () => {

        const product = { 
            ...fakeProduct, 
            quantity_stock: 2,
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const qtdInput = queryByTestId('qtd-input') as HTMLInputElement;

        fireEvent.change(qtdInput, { target: { value: '-1' }});
        
        expect(qtdInput.value).toBe('0');
    });

    it('should disable add to cart button if select zero in qtd', async () => {

        const product = { 
            ...fakeProduct, 
            quantity_stock: 2,
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const qtdInput = queryByTestId('qtd-input') as HTMLInputElement;
        const addToCartPageButton = queryByTestId('add-to-cart-page-button');

        fireEvent.change(qtdInput, { target: { value: '0' }});
        
        expect(addToCartPageButton).toBeDisabled();
    });

    it('should go to cart when click in add to cart', async () => {

        const spyRouter = jest.spyOn(router, 'useRouter');

        const product = { 
            ...fakeProduct, 
            quantity_stock: 2,
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const qtdInput = queryByTestId('qtd-input') as HTMLInputElement;
        const addToCartPageButton = queryByTestId('add-to-cart-page-button');

        fireEvent.change(qtdInput, { target: { value: '1' }});
        fireEvent.click(addToCartPageButton);
        
        expect(spyRouter).toBeCalledTimes(16);
    });

    it('should render frequently buyed with', async () => {

        const product = { 
            ...fakeProduct, 
            quantity_stock: 2,
            productsBuyedWith: [fakeProduct]
        };

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
        .onGet('/products/1?buyedWith=4').reply(200, product);

        const { queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <CartContextProvider>
                    <FilterBarContextProvider>
                        <ProductPage 
                            product={product}
                        />
                    </FilterBarContextProvider>
                </CartContextProvider>
            </ThemeContextProvider>
        ));

        const buyedWithContainer = queryByTestId('buyed-with-container');
        
        expect(buyedWithContainer).toBeInTheDocument();
    });
});
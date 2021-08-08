import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as router from 'next/router';
import '@testing-library/jest-dom';

import ProductCard from './';
import { CartContextProvider } from '../../../contexts/cartContext';
import { fakeProduct } from '../../../testUtils/fakeData';

jest.mock('next/router', () => require('next-router-mock'));

describe('Product Card Tests', () => {

    it('should click on card to go to product page', async () => {

        const spyRouter = jest.spyOn(router, 'useRouter');

        const { getByTestId } = render(
            <CartContextProvider>
                <ProductCard 
                    product={fakeProduct}
                />
            </CartContextProvider>
        );

        const productCardAnchor = getByTestId('product-card-anchor');

        fireEvent.click(productCardAnchor);

        expect(spyRouter).toBeCalledTimes(2);
    });

    it('should render discount span when isOnSale is true', async () => {

        const now = new Date().toISOString();
        const discountStart = new Date(new Date().setSeconds(new Date().getSeconds() - 1)).toISOString();
        const discountEnd = new Date(new Date().setSeconds(new Date().getSeconds() + 1)).toISOString();

        const { queryByTestId } = render(
            <CartContextProvider>
                <ProductCard 
                    product={{ 
                        ...fakeProduct, 
                        isOnSale: true, 
                        discount_percent: 10,
                        dateNow: now,
                        discount_datetime_start: discountStart,
                        discount_datetime_end: discountEnd,
                    }}
                />
            </CartContextProvider>
        );

        const discountSpan = queryByTestId('discount-span');

        expect(discountSpan).toBeInTheDocument();
        expect(discountSpan.innerHTML).toBe('10%');
    });

    it('should render lacking span when quantity_stock is zero', async () => {

        const { queryByTestId } = render(
            <CartContextProvider>
                <ProductCard 
                    product={{ 
                        ...fakeProduct, 
                        quantity_stock: 0
                    }}
                />
            </CartContextProvider>
        );

        const discountSpan = queryByTestId('lacking-span');

        expect(discountSpan).toBeInTheDocument();
    });

    it('should add product to cart', async () => {

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        const { getByTestId } = render(
            <CartContextProvider>
                <ProductCard 
                    product={fakeProduct}
                />
            </CartContextProvider>
        );

        const addToCartButton = getByTestId('add-to-cart-button');

        fireEvent.click(addToCartButton);

        expect(alertSpy).toBeCalled();
    });
});
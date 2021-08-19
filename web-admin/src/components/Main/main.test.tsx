import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import Main from './index';
import { ThemeContextProvider } from '../../contexts/ThemeContext';
import api from '../../services/api';
import { fakeProducts, fakeCategories, fakeOrders } from '../../testUtils/fakeData';

/*jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));*/

jest.mock('next/router', () => require('next-router-mock'));

describe('Main Component Tests', () => {

    it("shoud have 'Produtos' label", () => {

        render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        );

        const labelText = screen.getByText('Produtos');
        
        expect(labelText).toBeInTheDocument();
    });

    it("shoud have 'Categorias' label", () => {

        const { getByText } = render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        );

        const labelText = getByText('Categorias');
        
        expect(labelText).toBeInTheDocument();
        expect(labelText).toBe(labelText);
    });

    it("shoud have 'Ordens' label", () => {

        const { getByText } = render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        );

        const labelText = getByText('Ordens');
        
        expect(labelText).toBeInTheDocument();
        expect(labelText).toBe(labelText);
    });

    it('should render List Products component', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products?offset=0&limit=15&filter=id').reply(200, fakeProducts)
            .onGet('/categories').reply(200, fakeCategories)
        ;
        
        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        ));

        const productInputCheckbox = getByTestId('products-cb') as HTMLInputElement;
        const listProductsAnchor = getByTestId('list-product-submenu');

        fireEvent.click(productInputCheckbox);
        await waitFor(() => fireEvent.click(listProductsAnchor));

        const listProductsComponent = queryByTestId('list-products-container');

        expect(productInputCheckbox.checked).toBe(true);
        expect(listProductsComponent).toBeInTheDocument();
    });

    it('should render Add Product component', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/products?offset=0&limit=15&filter=id').reply(200, fakeProducts)
            .onGet('/categories').reply(200, fakeCategories)
        ;

        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        ));

        const addProductsAnchor = getByTestId('add-product-submenu');

        await waitFor(() => fireEvent.click(addProductsAnchor));

        const addProductsComponent = queryByTestId('add-product-container');

        expect(addProductsComponent).toBeInTheDocument();
    });

    it('should render List Categories component', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);
        
        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        ));

        const categoryInputCheckbox = getByTestId('categories-cb') as HTMLInputElement;
        const listCategoriesAnchor = getByTestId('list-categories-submenu');

        fireEvent.click(categoryInputCheckbox);
        await waitFor(() => fireEvent.click(listCategoriesAnchor));

        const listCategoriesComponent = queryByTestId('list-categories-container');

        expect(categoryInputCheckbox.checked).toBe(true);
        expect(listCategoriesComponent).toBeInTheDocument();
    });

    it('should render Add Category component', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);
        
        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        ));

        const addCategoryAnchor = getByTestId('add-category-submenu');

        await waitFor(() => fireEvent.click(addCategoryAnchor));

        const addCategoryComponent = queryByTestId('add-category-container');

        expect(addCategoryComponent).toBeInTheDocument();
    });

    it('should render List Orders component', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)
            .onGet('/admin/orders?limit=15&offset=0').reply(200, fakeOrders)
        ;
        
        const { getByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        ));

        const ordersInputCheckbox = getByTestId('orders-cb') as HTMLInputElement;
        const listOrdersAnchor = getByTestId('list-orders-submenu');

        fireEvent.click(ordersInputCheckbox);
        await waitFor(() => fireEvent.click(listOrdersAnchor));

        const listOrdersComponent = queryByTestId('list-orders-component');

        expect(ordersInputCheckbox.checked).toBe(true);
        expect(listOrdersComponent).toBeInTheDocument();
    });
});

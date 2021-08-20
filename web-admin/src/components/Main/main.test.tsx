import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

        const listProductsLi = getByTestId('list-products-li');
        const addProductLi = getByTestId('add-product-li');
        const listCategoriesLi = getByTestId('list-categories-li');
        const addCategoryLi = getByTestId('add-category-li');
        const listOrdersLi = getByTestId('list-orders-li');

        const listProductsComponent = queryByTestId('list-products-container');
        const addProductsComponent = queryByTestId('add-product-container');
        const listCategoriesComponent = queryByTestId('list-categories-container');
        const addCategoryComponent = queryByTestId('add-category-container');
        const listOrdersComponent = queryByTestId('list-orders-component');
        
        expect(productInputCheckbox.checked).toBe(true);
        
        expect(listProductsLi).toHaveClass('active');
        expect(addProductLi).not.toHaveClass('active');
        expect(listCategoriesLi).not.toHaveClass('active');
        expect(addCategoryLi).not.toHaveClass('active');
        expect(listOrdersLi).not.toHaveClass('active');

        expect(listProductsComponent).toBeInTheDocument();
        expect(addProductsComponent).not.toBeInTheDocument();
        expect(listCategoriesComponent).not.toBeInTheDocument();
        expect(addCategoryComponent).not.toBeInTheDocument();
        expect(listOrdersComponent).not.toBeInTheDocument();
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

        const listProductsLi = getByTestId('list-products-li');
        const addProductLi = getByTestId('add-product-li');
        const listCategoriesLi = getByTestId('list-categories-li');
        const addCategoryLi = getByTestId('add-category-li');
        const listOrdersLi = getByTestId('list-orders-li');

        const listProductsComponent = queryByTestId('list-products-container');
        const addProductsComponent = queryByTestId('add-product-container');
        const listCategoriesComponent = queryByTestId('list-categories-container');
        const addCategoryComponent = queryByTestId('add-category-container');
        const listOrdersComponent = queryByTestId('list-orders-component');

        expect(listProductsLi).not.toHaveClass('active');
        expect(addProductLi).toHaveClass('active');
        expect(listCategoriesLi).not.toHaveClass('active');
        expect(addCategoryLi).not.toHaveClass('active');
        expect(listOrdersLi).not.toHaveClass('active');

        expect(listProductsComponent).not.toBeInTheDocument();
        expect(addProductsComponent).toBeInTheDocument();
        expect(listCategoriesComponent).not.toBeInTheDocument();
        expect(addCategoryComponent).not.toBeInTheDocument();
        expect(listOrdersComponent).not.toBeInTheDocument();
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

        const listProductsLi = getByTestId('list-products-li');
        const addProductLi = getByTestId('add-product-li');
        const listCategoriesLi = getByTestId('list-categories-li');
        const addCategoryLi = getByTestId('add-category-li');
        const listOrdersLi = getByTestId('list-orders-li');

        const listProductsComponent = queryByTestId('list-products-container');
        const addProductsComponent = queryByTestId('add-product-container');
        const listCategoriesComponent = queryByTestId('list-categories-container');
        const addCategoryComponent = queryByTestId('add-category-container');
        const listOrdersComponent = queryByTestId('list-orders-component');

        expect(categoryInputCheckbox.checked).toBe(true);

        expect(listProductsLi).not.toHaveClass('active');
        expect(addProductLi).not.toHaveClass('active');
        expect(listCategoriesLi).toHaveClass('active');
        expect(addCategoryLi).not.toHaveClass('active');
        expect(listOrdersLi).not.toHaveClass('active');

        expect(listProductsComponent).not.toBeInTheDocument();
        expect(addProductsComponent).not.toBeInTheDocument();
        expect(listCategoriesComponent).toBeInTheDocument();
        expect(addCategoryComponent).not.toBeInTheDocument();
        expect(listOrdersComponent).not.toBeInTheDocument();
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

        const listProductsLi = getByTestId('list-products-li');
        const addProductLi = getByTestId('add-product-li');
        const listCategoriesLi = getByTestId('list-categories-li');
        const addCategoryLi = getByTestId('add-category-li');
        const listOrdersLi = getByTestId('list-orders-li');

        const listProductsComponent = queryByTestId('list-products-container');
        const addProductsComponent = queryByTestId('add-product-container');
        const listCategoriesComponent = queryByTestId('list-categories-container');
        const addCategoryComponent = queryByTestId('add-category-container');
        const listOrdersComponent = queryByTestId('list-orders-component');

        expect(listProductsLi).not.toHaveClass('active');
        expect(addProductLi).not.toHaveClass('active');
        expect(listCategoriesLi).not.toHaveClass('active');
        expect(addCategoryLi).toHaveClass('active');
        expect(listOrdersLi).not.toHaveClass('active');

        expect(listProductsComponent).not.toBeInTheDocument();
        expect(addProductsComponent).not.toBeInTheDocument();
        expect(listCategoriesComponent).not.toBeInTheDocument();
        expect(addCategoryComponent).toBeInTheDocument();
        expect(listOrdersComponent).not.toBeInTheDocument();
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

        const listProductsLi = getByTestId('list-products-li');
        const addProductLi = getByTestId('add-product-li');
        const listCategoriesLi = getByTestId('list-categories-li');
        const addCategoryLi = getByTestId('add-category-li');
        const listOrdersLi = getByTestId('list-orders-li');

        const listProductsComponent = queryByTestId('list-products-container');
        const addProductsComponent = queryByTestId('add-product-container');
        const listCategoriesComponent = queryByTestId('list-categories-container');
        const addCategoryComponent = queryByTestId('add-category-container');
        const listOrdersComponent = queryByTestId('list-orders-component');

        expect(ordersInputCheckbox.checked).toBe(true);

        expect(listProductsLi).not.toHaveClass('active');
        expect(addProductLi).not.toHaveClass('active');
        expect(listCategoriesLi).not.toHaveClass('active');
        expect(addCategoryLi).not.toHaveClass('active');
        expect(listOrdersLi).toHaveClass('active');

        expect(listProductsComponent).not.toBeInTheDocument();
        expect(addProductsComponent).not.toBeInTheDocument();
        expect(listCategoriesComponent).not.toBeInTheDocument();
        expect(addCategoryComponent).not.toBeInTheDocument();
        expect(listOrdersComponent).toBeInTheDocument();
    });
});

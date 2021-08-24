import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import ListCategory from './';
import { ThemeContextProvider } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { fakeCategories } from '../../../testUtils/fakeData';

describe('List Category Tests', () => {

    it('should render category table', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)

        const { getAllByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <ListCategory />
            </ThemeContextProvider>
        ));

        const categoryTableRows = getAllByTestId('category-table-row')

        expect(categoryTableRows.length).toBe(fakeCategories.length);
    });

    it('should open update modal', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)

        const { getAllByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <ListCategory />
            </ThemeContextProvider>
        ));

        const openUpdateButtons = getAllByTestId('open-update-button')

        await waitFor(() => fireEvent.click(openUpdateButtons[0]));

        const updateCategoryContainer = queryByTestId('update-category-container');        

        expect(updateCategoryContainer).toBeInTheDocument();
    });

    it('should open delete modal', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories)

        const { getAllByTestId, queryByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <ListCategory />
            </ThemeContextProvider>
        ));

        const openDeleteButtons = getAllByTestId('open-delete-button')

        await waitFor(() => fireEvent.click(openDeleteButtons[0]));

        const deleteCategoryContainer = queryByTestId('delete-category-container');        

        expect(deleteCategoryContainer).toBeInTheDocument();
    });
});
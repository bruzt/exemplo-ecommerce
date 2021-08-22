import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import DeleteCategory from './';
import { ThemeContextProvider } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { fakeCategories } from '../../../testUtils/fakeData';

describe('Delete Category Tests', () => {

    it('should call api to delete category', async () => {

        const apiMock = new MockAdapter(api);
        apiMock
            .onGet('/categories').reply(200, fakeCategories)
            .onDelete('/categories/3').reply(204)
        ;

        const apiSpy = jest.spyOn(api, 'delete');

        const confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => true));

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        function deletingMock(value: boolean) { return value }

        const { getByTestId, getByText } = await waitFor(() => render(
            <ThemeContextProvider>
                <DeleteCategory deleting={deletingMock} deletingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const categoryName = getByText(fakeCategories[0].name);
        const transferToSelect = getByTestId('transfer-to');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(transferToSelect, { target: { value: String(fakeCategories[1].id) }});   
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(apiSpy).toBeCalledTimes(1);
        expect(categoryName).toBeInTheDocument();
    });

    it('should not call api to delete category - did not select "transfer to"', async () => {

        const apiMock = new MockAdapter(api);
        apiMock
            .onGet('/categories').reply(200, fakeCategories)
            .onDelete('/categories/3').reply(204)
        ;

        const apiSpy = jest.spyOn(api, 'delete');

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        function deletingMock(value: boolean) { return value }

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <DeleteCategory deleting={deletingMock} deletingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const submitButton = getByTestId('submit-button');
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(apiSpy).toBeCalledTimes(0);
    });

    

    it('should close delete modal', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);

        let openModal = true;
        function deletingMock(value: boolean) { openModal = value }

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <DeleteCategory deleting={deletingMock} deletingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const closeButton = getByTestId('close-button');
        
        fireEvent.click(closeButton);

        expect(openModal).toBe(false);
    });
});
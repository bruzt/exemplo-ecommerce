import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import AddCategory from './';
import { ThemeContextProvider } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { fakeCategories } from '../../../testUtils/fakeData';

describe('Add Category Tests', () => {

    it('should call api to add category', async () => {

        const apiMock = new MockAdapter(api);
        apiMock
            .onGet('/categories').reply(200, fakeCategories)
            .onPost('/categories').reply(200, { ...fakeCategories[0], id: 5 })
        ;

        const apiSpy = jest.spyOn(api, 'post');

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <AddCategory />
            </ThemeContextProvider>
        ));

        const categoryNameInput = getByTestId('category-name');
        const categoryParentInput = getByTestId('category-parent');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(categoryNameInput, { target: { value: 'category test' }});
        fireEvent.change(categoryParentInput, { target: { value: '2' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(apiSpy).toBeCalledTimes(1);
    });

    it('should not call api to add category - name too small', async () => {

        const apiMock = new MockAdapter(api);
        apiMock
            .onGet('/categories').reply(200, fakeCategories)
            .onPost('/categories').reply(200, { ...fakeCategories[0], id: 5 })
        ;

        const apiSpy = jest.spyOn(api, 'post');

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <AddCategory />
            </ThemeContextProvider>
        ));

        const categoryNameInput = getByTestId('category-name');
        const categoryParentInput = getByTestId('category-parent');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(categoryNameInput, { target: { value: 'ca' }});
        fireEvent.change(categoryParentInput, { target: { value: '2' }});

        await waitFor(() => fireEvent.click(submitButton));

        expect(apiSpy).toBeCalledTimes(0);
        expect(submitButton).toBeDisabled();
    });
});
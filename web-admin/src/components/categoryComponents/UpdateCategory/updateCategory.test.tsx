import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';

import UpdateCategory from './';
import { ThemeContextProvider } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { fakeCategories } from '../../../testUtils/fakeData';

describe('Update Category Tests', () => {

    it('should call api to update category', async () => {

        const apiMock = new MockAdapter(api);
        apiMock
            .onGet('/categories').reply(200, fakeCategories)
            .onPut('/categories/3').reply(200, { ...fakeCategories[0], name: 'test name', parent_id: 5 })
        ;

        const apiSpy = jest.spyOn(api, 'put');

        function updatingMock(value: boolean) { return value }

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <UpdateCategory updating={updatingMock} updatingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const categoryNameinput = getByTestId('category-name') as HTMLInputElement;
        const parentSelect = getByTestId('select-parent') as HTMLSelectElement;
        const submitButton = getByTestId('submit-button');

        fireEvent.change(categoryNameinput, { target: { value: 'test name' }});   
        fireEvent.change(parentSelect, { target: { value: '5' }});   
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(categoryNameinput.value).toBe('test name');
        expect(parentSelect.value).toBe('5');
        expect(apiSpy).toBeCalledTimes(1);
    });

    it('should not call api to update category - name too small', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);

        const apiSpy = jest.spyOn(api, 'put');

        function updatingMock(value: boolean) { return value }

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <UpdateCategory updating={updatingMock} updatingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const categoryNameinput = getByTestId('category-name') as HTMLInputElement;
        const parentSelect = getByTestId('select-parent') as HTMLSelectElement;
        const submitButton = getByTestId('submit-button');

        fireEvent.change(categoryNameinput, { target: { value: 'te' }});   
        fireEvent.change(parentSelect, { target: { value: '5' }});   
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(submitButton).toBeDisabled();
        expect(apiSpy).toBeCalledTimes(0);
    });

    it('should not call api to update category - set parent_id to one of its own children', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);

        const apiSpy = jest.spyOn(api, 'put');

        const alertSpy = jest.spyOn(window, 'alert');
        alertSpy.mockImplementation(jest.fn(() => true));

        function updatingMock(value: boolean) { return value }

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <UpdateCategory updating={updatingMock} updatingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const parentSelect = getByTestId('select-parent') as HTMLSelectElement;
        const submitButton = getByTestId('submit-button');
  
        fireEvent.change(parentSelect, { target: { value: '4' }});   
        
        await waitFor(() => fireEvent.click(submitButton));

        expect(alertSpy).toBeCalledTimes(1);
        expect(apiSpy).toBeCalledTimes(0);
    });

    it('should close update modal', async () => {

        const apiMock = new MockAdapter(api);
        apiMock.onGet('/categories').reply(200, fakeCategories);

        let openModal = true;
        function updatingMock(value: boolean) { openModal = value }

        const { getByTestId } = await waitFor(() => render(
            <ThemeContextProvider>
                <UpdateCategory updating={updatingMock} updatingCategory={fakeCategories[0]} />
            </ThemeContextProvider>
        ));

        const closeButton = getByTestId('close-button');
  
        fireEvent.click(closeButton);

        expect(openModal).toBe(false);
    });
});
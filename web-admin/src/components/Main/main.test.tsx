import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Main from './index';
import { ThemeContextProvider } from '../../contexts/ThemeContext';

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

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

    it('should open tab when clicked in "Produtos"', () => {

        const { container } = render(
            <ThemeContextProvider>
                <Main />
            </ThemeContextProvider>
        );

        const inputCheckbox: HTMLInputElement = container.querySelector('#products-cb');

        fireEvent.click(inputCheckbox);

        expect(inputCheckbox.checked).toBe(true);
    });
});

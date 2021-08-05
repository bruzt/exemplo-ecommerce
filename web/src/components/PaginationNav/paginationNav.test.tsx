import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PaginationNav from './';

describe('Pagination Nav Tests', () => {

    it('should change page - start', async () => {

        let page = 1;
        function handlePagination(value: number) { page = value }

        const { getAllByTestId, rerender } = render(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const paginationButtons = getAllByTestId('pagination-button');

        fireEvent.click(paginationButtons[1]);

        rerender(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        expect(page).toBe(2);
        expect(paginationButtons[1].innerHTML).toBe('2');
        expect(paginationButtons[1]).toHaveClass('active');
        expect(paginationButtons[1]).toBeDisabled();
        expect(paginationButtons[0]).not.toHaveClass('active');
        expect(paginationButtons[2]).not.toHaveClass('active');
        expect(paginationButtons[3]).not.toHaveClass('active');
        expect(paginationButtons[4]).not.toHaveClass('active');
        expect(paginationButtons[0]).not.toBeDisabled();
        expect(paginationButtons[2]).not.toBeDisabled();
        expect(paginationButtons[3]).not.toBeDisabled();
        expect(paginationButtons[4]).not.toBeDisabled();
    });

    it('should change page - middle foward', async () => {

        let page = 10;
        function handlePagination(value: number) { page = value }

        const { getAllByTestId, rerender } = render(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const paginationButtons = getAllByTestId('pagination-button');

        fireEvent.click(paginationButtons[3]);

        rerender(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const paginationButtonsAfterClick = getAllByTestId('pagination-button');

        expect(page).toBe(11);
        expect(paginationButtonsAfterClick[2].innerHTML).toBe('11');
        expect(paginationButtonsAfterClick[2]).toHaveClass('active');
        expect(paginationButtonsAfterClick[2]).toBeDisabled();
        expect(paginationButtonsAfterClick[0]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[1]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[3]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[4]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[0]).not.toBeDisabled();
        expect(paginationButtonsAfterClick[1]).not.toBeDisabled();
        expect(paginationButtonsAfterClick[3]).not.toBeDisabled();
        expect(paginationButtonsAfterClick[4]).not.toBeDisabled();
    });

    it('should change page - middle backwards', async () => {

        let page = 10;
        function handlePagination(value: number) { page = value }

        const { getAllByTestId, rerender } = render(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const paginationButtons = getAllByTestId('pagination-button');

        fireEvent.click(paginationButtons[1]);

        rerender(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const paginationButtonsAfterClick = getAllByTestId('pagination-button');

        expect(page).toBe(9);
        expect(paginationButtonsAfterClick[2].innerHTML).toBe('9');
        expect(paginationButtonsAfterClick[2]).toHaveClass('active');
        expect(paginationButtonsAfterClick[2]).toBeDisabled();
        expect(paginationButtonsAfterClick[0]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[1]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[3]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[4]).not.toHaveClass('active');
        expect(paginationButtonsAfterClick[0]).not.toBeDisabled();
        expect(paginationButtonsAfterClick[1]).not.toBeDisabled();
        expect(paginationButtonsAfterClick[3]).not.toBeDisabled();
        expect(paginationButtonsAfterClick[4]).not.toBeDisabled();
    });

    it('should change page - end', async () => {

        let page = 15;
        function handlePagination(value: number) { page = value }

        const { getAllByTestId, rerender } = render(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const paginationButtons = getAllByTestId('pagination-button');

        fireEvent.click(paginationButtons[3]);

        rerender(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        expect(page).toBe(14);
        expect(paginationButtons[3].innerHTML).toBe('14');
        expect(paginationButtons[3]).toHaveClass('active');
        expect(paginationButtons[3]).toBeDisabled();
        expect(paginationButtons[0]).not.toHaveClass('active');
        expect(paginationButtons[1]).not.toHaveClass('active');
        expect(paginationButtons[2]).not.toHaveClass('active');
        expect(paginationButtons[4]).not.toHaveClass('active');
        expect(paginationButtons[0]).not.toBeDisabled();
        expect(paginationButtons[1]).not.toBeDisabled();
        expect(paginationButtons[2]).not.toBeDisabled();
        expect(paginationButtons[4]).not.toBeDisabled();
    });

    it('should go directly to last page', async () => {

        let page = 1;
        function handlePagination(value: number) { page = value }

        const { getByTestId } = render(<PaginationNav
            currentPage={page}
            handlePagination={handlePagination}
            limitPageNav={5}
            totalPages={15}
        />);

        const lastPageButton = getByTestId('last-page-button');

        fireEvent.click(lastPageButton);

        expect(page).toBe(15);
    });
});
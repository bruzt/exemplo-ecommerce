import React from 'react';

import { Container } from './styles';

interface IProps {
    totalPages: number;
    currentPage: number;
    limitPageNav: number;
    handlePagination: (value: number) => void;
}

export default function PaginationNav({ totalPages, currentPage, limitPageNav, handlePagination }: IProps) {
	
	function renderPagination() {

        const page = [];
        let pageNumberStart = 0;
        let pageNumberEnd = 0;

        if (totalPages < limitPageNav) {
            limitPageNav = totalPages
        }

        // estamos nas primeiras paginas
        if ((currentPage - Math.floor(limitPageNav / 2)) < 1) {
            pageNumberStart = 0;
            pageNumberEnd = limitPageNav;

        // estamos nas ultimas paginas
        } else if ((currentPage + Math.floor(limitPageNav / 2)) >= totalPages) {
            pageNumberStart = totalPages - limitPageNav;
            pageNumberEnd = totalPages;

        // nem perto do começo nem perto do fim
        } else {
            pageNumberStart = currentPage - Math.floor((limitPageNav / 2)) - 1;
            pageNumberEnd = currentPage + Math.floor(limitPageNav / 2);

            if (pageNumberEnd > totalPages) pageNumberEnd--;
        }

        for (let i = pageNumberStart; i <= pageNumberEnd - 1; i++) {
            page.push(
				<li key={i} className={`page-item`}>
					<button
						type='button'
						data-testid='pagination-button'
						className={`page-link ${(currentPage == i + 1) ? 'active' : ''}`}
						disabled={(currentPage == i + 1)}
						value={i + 1}
						onClick={() => handlePagination(Number(i + 1))}
					>
						{i + 1}
					</button>
				</li>
            );
        }

        return page;
    }

    return (
		<Container data-testid='pagination-container'>
			<ul className="pagination">

				{/*
				<li className={`page-item ${(currentPage === 0) ? 'disabled' : ''}`}>
					<button type='button' className="page-link" aria-label="Previous" value={currentPage} onClick={handlePagination}>  
					
						<span aria-hidden="true">&laquo;</span>
						<span className="sr-only">Previous</span>
					</button>
				</li>
				*/}

				{renderPagination()}

				{/*
				<li className={`page-item ${(currentPage === totalPages-1) ? 'disabled' : ''}`}>
					<button type='button' className="page-link" aria-label="Next" value={currentPage+2} onClick={handlePagination}>
					
						<span aria-hidden="true">&raquo;</span>
						<span className="sr-only">Next</span>
					</button>
				</li>
				*/}

				&nbsp;

				<li className='page-item disabled'>
					<button
						type='button'
						data-testid='last-page-button'
						className="page-link"
						disabled={(currentPage === totalPages)}
						onClick={() => handlePagination(totalPages)}
					>
						...{totalPages}
					</button>
				</li>

			</ul>
		</Container>
    );
}

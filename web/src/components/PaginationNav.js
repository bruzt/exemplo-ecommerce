import React from 'react';
import css from 'styled-jsx/css';

export default function PaginationNav({ totalPages, currentPage, limitPageNav, handlePagination }) {

    function renderPagination() {

        let page = [];
        let pageNumberStart = 0;
        let pageNumberEnd = 0;

        if (totalPages < limitPageNav) {
            limitPageNav = totalPages
        }

        // estamos nas primeiras paginas
        if ((currentPage - parseInt(limitPageNav / 2)) < 1) {
            pageNumberStart = 0;
            pageNumberEnd = limitPageNav;

        // estamos nas ultimas paginas
        } else if ((currentPage + parseInt(limitPageNav / 2)) >= totalPages) {
            pageNumberStart = totalPages - limitPageNav;
            pageNumberEnd = totalPages;

        // nem perto do começo nem perto do fim
        } else {
            pageNumberStart = currentPage - parseInt((limitPageNav / 2)) - 1;
            pageNumberEnd = currentPage + parseInt(limitPageNav / 2);

            if (pageNumberEnd > totalPages) pageNumberEnd--;
        }

        for (let i = pageNumberStart; i <= pageNumberEnd - 1; i++) {
            page.push(
                <React.Fragment key={i}>
                    <li className={`page-item`}>
                        <button
                            type='button'
                            className={`page-link ${(currentPage === i + 1) ? 'active' : ''}`}
                            disabled={(currentPage === i + 1)}
                            value={i + 1}
                            onClick={(event) => handlePagination(Number(event.target.value))}
                        >
                            {i + 1}
                        </button>
                    </li>

                    <style jsx>{styles}</style>
                </React.Fragment>
            );
        }

        return page;
    }

    return (
        <>

            <nav aria-label="Page navigation">
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
                            className="page-link"
                            disabled={(currentPage === totalPages)}
                            onClick={() => handlePagination(totalPages)}
                        >
                            ...{totalPages}
                        </button>
                    </li>

                </ul>
            </nav>

            <style jsx>{styles}</style>
        </>
    );
}

const styles = css`
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;    
    }

    nav ul {
        display: flex;
        list-style: none;
    }

    ul li button {
        margin: 5px;
        padding: 10px 20px;
        border: 0;
        border-radius: 2px;
        font-size: 25px;
        color: #0D2235;
    }

    ul li button:hover {
        background: #16324C;
    }

    ul li button:active {
        background: #0D2235;
    }

    ul li button.active {
        background: #0D2235;
        color: #eee;
    }
`;
import styled from 'styled-components';

export const Container = styled.nav`

    width: 100%;
    height: 3.125rem;
    background: ${props => props.theme.secondary};

    div.limit-center {
        width: 100%;
        height: 100%;
        max-width: 68.75rem;
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    div.limit-center .category-and-searchbar {
        width: 100%;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    div.limit-center > div.switch-container {
        height: 1.75rem;
    }

    div.mobile-menu {
        display: none !important;

        width: 100%;
        height: 100%;

        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    div.mobile-menu button {
        width: 3.125rem;
        height: 2.5rem;
        margin-right: 0.3125rem;
        border: 0;
        border-radius: 0.25rem;
        background: ${props => props.theme.primary};
        color: ${props => props.theme.color};
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.react-switch-bg svg {
        margin: 0.25rem 0.1875rem;
    }

    @media (max-width: 650px) {
        div.limit-center .category-and-searchbar {
            display: none !important;
        }

        div.limit-center div.mobile-menu {
            display: flex !important;
        }

        div.limit-center {
            padding-left: 0.625rem;
        }
    }
`;

export const SearchBarForm = styled.form`
    
    position: relative;
    width: 100%;
    max-width: 25rem;

    & > div {
        display: flex;
        align-items: center;
    }

    input {
        width: 100%;
        height: 2.5rem;
        padding: 0.3125rem;
        border: none;
        font-size: 1.25rem;
        border-top-left-radius: 0.3125rem;
        border-bottom-left-radius: 0.3125rem;
        text-align: center;
    }

    button {
        width: 2.5rem;
        height: 2.5rem;

        border: none;
        cursor: pointer;
        border-top-right-radius: 0.3125rem;
        border-bottom-right-radius: 0.3125rem;
    }  

    ul.dropdown-search {
        position: absolute;
        top: 2.8125rem;
        z-index: 10;

        width: 100%;
        background: #eee;
        list-style: none;
    }

    ul.dropdown-search li {
        color: #111;
        margin-bottom: 0.3125rem;
    }

    ul.dropdown-search li a {
        cursor: pointer;

        display: flex;
        justify-content: space-between;
    }

    ul.dropdown-search li div.img-container {
        width: 6.25rem;
        height: 2.8125rem;
    }

    ul.dropdown-search li img {
        width: auto;
        max-width: 2.8125rem;
        height: 2.8125rem;

        object-fit: cover;
    }

    ul.dropdown-search li span.title {
        width: 100%;
        height: 2.8125rem;
        padding: 0.625rem 0.3125rem;
        font-size: 1.25rem;
        line-height: 1.875rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    ul.dropdown-search li span.price {
        width: 12.5rem;
        font-size: 1.25rem;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    li span.price > span {
        font-size: 0.9375rem;
    }
`;

export const CategoryDropdownMenu = styled.div`
    ul {
        list-style: none;
        z-index: 10;
        position: relative;
    }
                
    ul li { 
        width: 12.5rem; 
        height: 2.5rem; 
        background: ${props => props.theme.primary};
        float: left; 
        line-height: 2.5rem; 
        font-size: 1.25rem;
        text-align: center; 
        user-select: none; 
        position: relative;
    }

    ul li.category-menu {
        border-radius: 0.3125rem;
    }

    ul li.category-menu.active {
        border-radius: 0.3125rem 0.3125rem 0 0;
        border-bottom: 1px solid ${props => props.theme.secondary};
    }

    ul li p {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
                
    ul li:hover { 
        background: ${props => props.theme.secondary};
    }

    ul li:active { 
        background: ${props => props.theme.primary};
    }

    li + li {
        border-top: 1px solid ${props => props.theme.secondary};
    } 

    li > ul {
        display: none;
    }

    li.has-children > ul {
        position: absolute; 
        left: 12.5rem; 
        top: 0; 
    }

    li.active > ul {
        display: block;
    }

    li.has-children:hover > ul { 
        display: block;
    }
`;

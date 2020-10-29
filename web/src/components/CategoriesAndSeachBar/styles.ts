import styled from 'styled-components';

export const Container = styled.div`

    nav {
        width: 100%;
        height: 50px;
        background: #16324C;
    }

    nav .limit-center {
        width: 100%;
        height: 100%;
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav .limit-center form {
        display: flex;
        justify-content: center;
    }

    nav .limit-center form input {
        width: 400px;
        height: 40px;
        padding: 5px;
        border: none;
        font-size: 20px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        text-align: center;
    }

    nav .limit-center form button {
        width: 40px;
        height: 40px;
        border: none;
        cursor: pointer;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        margin: 0 200px 0 0;
    }  

    @media (max-width: 900px) {
        nav .limit-center form input {
            width: 100%;
            max-width: 400px;
        }

        nav .limit-center form button {
            margin: 0;
        }
    }
`;

export const CategoryDropdownMenu = styled.div`
    ul {
        list-style: none;
        z-index: 10;
        position: relative;
    }
                
    ul li { 
        width: 200px; 
        height: 40px; 
        background: #0D2235; 
        float: left; 
        line-height: 40px; 
        font-size: 20px;
        text-align: center; 
        user-select: none; 
        position: relative;
    }

    ul li.category-menu {
        border-radius: 5px;
    }

    ul li.category-menu.active {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: 1px solid #16324C;
    }

    ul li p {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
                
    ul li:hover { 
        background: #16324C;
    }

    ul li:active { 
        background: #0D2235;
    }

    li + li {
        border-top: 1px solid #16324C;
    } 

    li > ul {
        display: none;
    }

    li.has-children > ul {
        position: absolute; 
        left: 200px; 
        top: 0; 
    }

    li.active > ul {
        display: block;
    }

    li.has-children:hover > ul { 
        display: block;
    }
`;

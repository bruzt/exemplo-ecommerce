import styled from 'styled-components';

export const Container = styled.nav`
    
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;    

    ul {
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
        cursor: pointer;
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

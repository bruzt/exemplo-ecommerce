import styled from 'styled-components';

export const Container = styled.nav`
    
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.625rem;    

    ul {
        display: flex;
        list-style: none;
    }

    ul li button {
        margin: 0.3125rem;
        padding: 0.625rem 20px;
        border: 0;
        border-radius: 2px;
        font-size: 1.5625rem;
        color: ${props => props.theme.primary};
        cursor: pointer;
    }

    ul li button:hover {
        background: ${props => props.theme.secondary};
        color: ${props => props.theme.color};
    }

    ul li button:active {
        background: ${props => props.theme.primary};
    }

    ul li button.active {
        background: ${props => props.theme.primary};
        color: ${props => props.theme.color};
    }
`;

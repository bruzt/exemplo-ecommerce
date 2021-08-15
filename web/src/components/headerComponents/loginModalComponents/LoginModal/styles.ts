import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw; 
    height: 100vh; 
    
    position: fixed; 
    z-index: 100; 
    
    background-color: rgba(1, 1, 1, 0.9); 

    .modal-card {
        width: 100%;
        max-width: 25rem;
        height: fit-content;

        padding: 1.25rem;
        margin: 10% auto; /* 10% from the top and centered */

        background-color: ${props => props.theme.primary};
        border-radius: 0.3125rem;
    }

    .modal-card header {
        height: fit-content;

        display: flex;
        justify-content: space-between;
    }

    .modal-card .close-modal {
        width: 1.875rem;
        height: 1.875rem;
        border: 0;
        border-radius: 0.3125rem;
        font-weight: bold;
        background: ${props => props.theme.danger};
        color: ${props => props.theme.color};
        cursor: pointer;

        &:hover {
            background: ${props => props.theme.dangerActive};
        }
    }

    .modal-card main {
        padding-top: 2rem;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 0.625rem 0;
    }

    footer a {
        cursor: pointer;
        margin: 0.625rem 0 0 0;
    }
`;

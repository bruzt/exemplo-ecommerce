import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw; 
    height: 100vh; 
    
    position: fixed; 
    z-index: 100; 
    
    background-color: rgba(1, 1, 1, 0.9); 

    .modal-content {
        background-color: ${props => props.theme.primary};
        margin: 10% auto; /* 15% from the top and centered */
        padding: 1.25rem;
        width: 100%;
        max-width: 25rem;
        min-height: 21.875rem;
        border-radius: 0.3125rem;
    }

    .modal-content .modal-head {
        display: flex;
        justify-content: space-between;
    }

    .modal-content .close-modal {
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

    .create-forgot {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 0.625rem 0;
    }

    .create-forgot a {
        cursor: pointer;
        margin: 0.625rem 0 0 0;
    }
`;

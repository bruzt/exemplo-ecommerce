import styled from 'styled-components';

export const Container = styled.div`
    
    position: fixed; 
    z-index: 30; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
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

    .modal-content form {
        width: 100%;
        height: 100%;
        padding: 3.75rem 0 0 0;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .modal-content form.nono-animation {
        animation: nono-animation 500ms, fade paused;
    }

    .modal-content form .input-group  {
        display: flex;
        flex-direction: column;
        width: 18.75rem;
    }

    .modal-content form .input-group label {
        margin: 0 0 0 0.3125rem;
    }

    .modal-content form .input-group label span {
        font-size: 0.875rem;
    }

    .modal-content form .input-group + .input-group {
        margin: 1.25rem 0 0 0;
    }

    .modal-content form input {
        width: 100%;
        height: 2.5rem;
        font-size: 1.25rem;
        padding: 0.3125rem;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 0.3125rem;

        &.invalid {
            border: 0.125rem solid ${props => props.theme.danger};
        }
    }

    .modal-content form .login-button {
        margin: 1.875rem 0 0 0;
        width: 18.75rem;
        height: 3.125rem;
        border: 0;
        border-radius: 0.3125rem;
        background: ${props => props.theme.success};
        font-size: 1.25rem;
        cursor: pointer;
        color: ${props => props.theme.color};

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: ${props => props.theme.successActive};
        }

        &:active {
            background: ${props => props.theme.success};
        }

        &:disabled {
            background: ${props => props.theme.danger};
        }

        &:disabled:hover {
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

    @keyframes nono-animation {
        0%, 100% {
            transform: translateX(0);
        }

        33% {
            transform: translateX(-10%);
        }

        66% {
            transform: translateX(10%);
        }
    }
`;

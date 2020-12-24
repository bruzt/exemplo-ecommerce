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
        padding: 20px;
        width: 100%;
        max-width: 400px;
        min-height: 350px;
        border-radius: 5px;
    }

    .modal-content .modal-head {
        display: flex;
        justify-content: space-between;
    }

    .modal-content .close-modal {
        width: 30px;
        height: 30px;
        border: 0;
        border-radius: 5px;
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
        padding: 60px 0 0 0;

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
        width: 300px;
    }

    .modal-content form .input-group label {
        margin: 0 0 0 5px;
    }

    .modal-content form .input-group label span {
        font-size: 14px;
    }

    .modal-content form .input-group + .input-group {
        margin: 20px 0 0 0;
    }

    .modal-content form input {
        width: 100%;
        height: 40px;
        font-size: 20px;
        padding: 5px;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 5px;

        &.invalid {
            border: 2px solid ${props => props.theme.danger};
        }
    }

    .modal-content form .login-button {
        margin: 30px 0 0 0;
        width: 300px;
        height: 50px;
        border: 0;
        border-radius: 5px;
        background: ${props => props.theme.success};
        font-size: 20px;
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

        margin: 10px 0;
    }

    .create-forgot a {
        cursor: pointer;
        margin: 10px 0 0 0;
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

import styled from 'styled-components';

export const Container = styled.div`
    
    position: fixed; /* Stay in place */
    z-index: 30; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

    .modal-content {
        background-color: #0D2235;
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
        background: #a32e39;
        cursor: pointer;

        &:hover {
            background: #bf2232;
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
        border: 1px solid #60615b;
        border-radius: 5px;
    }

    .modal-content form .login-button {
        margin: 30px 0 0 0;
        width: 300px;
        height: 50px;
        border: 0;
        border-radius: 5px;
        background: #3E8C34;
        font-size: 15px;
        cursor: pointer;
        color: inherit;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: #41A933;
        }

        &:active {
            background: #3E8C34;
        }

        &:disabled {
            background: #a32e39;
        }

        &:disabled:hover {
            background: #bf2232;
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
`;

import styled from 'styled-components';

export const Container = styled.div`

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forgot-password {
        width: 100%;
        max-width: 300px;
        height: 300px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p.forgot-password {
        text-align: center;
    }

    .forgot-password input#forgot-pass-input {
        width: 100%;
        height: 40px;
        border: 0;
        border-radius: 5px;
        margin: 10px 0 0 0;
        padding: 5px;
        font-size: 20px;
        text-align: center;
    }

    .forgot-password button {
        width: 100%;
        height: 50px;
        margin: 30px 0 0 0;
        padding: 10px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
        background: #3E8C34;
        color: inherit;
        font-size: 15px;

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

    .forgot-password a {
        margin: 20px 0 0 0;
        cursor: pointer;
    }
`;

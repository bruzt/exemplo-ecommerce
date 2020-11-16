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
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
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
        background: ${props => props.theme.success};
        color: ${props => props.theme.color};
        font-size: 20px;
        font-weight: bold;

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

    .forgot-password a {
        margin: 20px 0 0 0;
        cursor: pointer;
    }
`;

import styled from 'styled-components';

export const Container = styled.div`

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forgot-password {
        width: 100%;
        max-width: 18.75rem;
        height: 18.75rem;

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
        height: 2.5rem;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 0.3125rem;
        margin: 0.625rem 0 0 0;
        padding: 0.3125rem;
        font-size: 1.25rem;
        text-align: center;
    }

    .forgot-password button {
        width: 100%;
        height: 50px;
        margin: 30px 0 0 0;
        padding: 10px;
        border: 0;
        border-radius: 0.3125rem;
        cursor: pointer;
        background: ${props => props.theme.success};
        color: ${props => props.theme.color};
        font-size: 1.25rem;
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
        margin: 1.25rem 0 0 0;
        cursor: pointer;
    }
`;

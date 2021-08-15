import styled from 'styled-components';

export const FormContainer = styled.form`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 2rem;

    p {
        text-align: center;
        margin: 2rem auto;
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

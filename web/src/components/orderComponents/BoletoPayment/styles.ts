import styled from 'styled-components';
import Loading from 'react-loader-spinner';

export const Container = styled.div`

    h2 {
        text-align: center;
        margin: 1.5625rem;
    }

    form.boleto-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.25rem;
    }

    form.boleto-form .freight-total {
        background: ${props => props.theme.primary};
        border-radius: 0.3125rem;
        padding: 0.625rem;
    }

    form.boleto-form .freight-total p + p + p {
        font-size: 1.875rem;
        font-weight: bold;
    }

    form.boleto-form .inputs {
        display: flex;
    }

    form.boleto-form .inputs .input-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    form.boleto-form .inputs .input-group input {
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 0.3125rem;
        margin: 0 0.3125rem;
        height: 2.5rem;
        padding: 0.3125rem;
        font-size: 1.25rem;
        text-align: center;
    }

    form.boleto-form .inputs .input-group input.invalid-cpf {
        border: 1px solid ${props => props.theme.danger};
    }

    form.boleto-form button {
        border: 0;
        border-radius: 0.3125rem;
        width: 12.5rem;
        height: 4.6875rem;
        background: ${props => props.theme.success};
        font-size: 1.25rem;
        font-weight: bold;
        color: inherit;
        cursor: pointer;

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

    @media (max-width: 768px) {
        form.boleto-form {
            flex-direction: column;
        }

        form.boleto-form div {
            margin-bottom: 0.9375rem;
        }

        form.boleto-form .inputs {
            flex-direction: column;
        }

        form.boleto-form .inputs div {
            margin-bottom: 0.9375rem;
        }
    }
`;

export const LoadingSpinner = styled(Loading).attrs({
    type: "TailSpin",
    color: '#0D2235',
    height: '1.875rem',
    width: '1.875rem',
})`

`

import styled from 'styled-components';
import Loading from 'react-loader-spinner';

export const Container = styled.div`

    h2 {
        text-align: center;
        margin: 20px;
    }

    form.boleto-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
    }

    form.boleto-form .freight-total {
        background: #0D2235;
        border-radius: 5px;
        padding: 10px;
    }

    form.boleto-form .freight-total p + p + p {
        font-size: 30px;
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
        border: 0;
        border-radius: 5px;
        margin: 0 5px;
        height: 40px;
        padding: 5px;
        font-size: 20px;
        text-align: center;
    }

    form.boleto-form .inputs .input-group input.invalid-cpf {
        border: 1px solid red;
    }

    form.boleto-form button {
        border: 0;
        border-radius: 5px;
        width: 200px;
        height: 75px;
        background: #3E8C34;
        font-size: 20px;
        font-weight: bold;
        color: inherit;
        cursor: pointer;

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

    @media (max-width: 768px) {
        form.boleto-form {
            flex-direction: column;
        }

        form.boleto-form div {
            margin-bottom: 15px;
        }

        form.boleto-form .inputs {
            flex-direction: column;
        }

        form.boleto-form .inputs div {
            margin-bottom: 15px;
        }
    }
`;

export const LoadingSpinner = styled(Loading).attrs({
    type: "TailSpin",
    color: '#0D2235',
    height: 30,
    width: 30,
})`

`

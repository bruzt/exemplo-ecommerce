import styled from 'styled-components';

export const Container = styled.div`

    h2 {
        text-align: center;
        margin: 1.5625rem;

        color: ${props => props.theme.color2};
    }

    .cc-form {
        background: ${props => props.theme.primary};
        border-radius: 0.3125rem;
        padding: 0.625rem;
    }

    .cc-form h2 {
        color: ${props => props.theme.color};
    }

    form {
        padding: 1.25rem 0 0 0;
    }

    form .grid-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        text-align: center;
        grid-gap: 0.3125rem;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .flex-row,
    .flex-row-2 {
        display: flex;
        flex-direction: row;
    
    }

    .flex-row div {
        margin: 0 0.3125rem;
    }

    .flex-row p {
        font-size: 1.875rem;
        align-self: center;
    }

    .w-100 {
        width: 100%;
    }

    form div {
        margin: 0.625rem 0 0 0;
    }

    form input, select {
        height: 2.5rem;
        border: 0;
        border-radius: 0.3125rem;
        padding: 0.1875rem;
        font-size: 1.25rem;
    }

    .justify-center {
        justify-content: center;
    }

    form .holder-name-label {
        margin: 1.75rem 0 0 0;
    }

    form input {
        text-align: center;
    }

    form input#card-holder-name {
        width: 100%;
        max-width: 25rem;

        margin: 0 auto;
    }

    form input#card-number {
        width: 100%;
        max-width: 12.5rem;
        align-self: center;
    }

    form input#cpf {
        width: 11.875rem;
    }

    #cpf.invalid-value {
        border: 0.125rem solid ${props => props.theme.danger};
    }

    form input#tel {
        width: 11.875rem;
    }

    form input#card-cvv {
        width: 4.6875rem;
    }

    form input#card-expiration-month {
        width: 3.125rem;
    }

    form input#card-expiration-year {
        width: 3.125rem;
    }

    form button {
        width: 6.25rem;
        height: 3.125rem;
        margin: 1.25rem 0 0 0;
    }

    form #street {
        width: 99%;

        margin: 0 auto;
    }

    form #number {
        width: 9.375rem;
    }

    form #neighborhood {
        width: 100%;
    }

    form #city {
        width: 18.75rem;
    }

    form #state {
        width: 100%;
        min-width: 4.0625rem;   
        background: #eee;
    }

    form #zipcode {
        min-width: 6.5rem;
        width: 100%;
    }                

    .same-addr-button {
        justify-content: flex-end;
    }

    .same-addr-button button {
        justify-self: flex-end;
        border: 0;
        border-radius: 0.3125rem;
        background: ${props => props.theme.secondary};
        color: ${props => props.theme.color};
        cursor: pointer;

        &:hover {
            background:${props => props.theme.background};
        }

        &:active {
            background: ${props => props.theme.secondary};
        }
    }

    .button-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.25rem;
    }

    .button-total .freight-total {
        background: ${props => props.theme.primary};
        border-radius: 0.3125rem;
        padding: 0.625rem;
    }

    .button-total .freight-total p + p + p {
        font-size: 1.875rem;
        font-weight: bold;
    }

    .button-total select#installments {
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0}
    }

    .button-total button {
        border: 0;
        border-radius: 0.3125rem;
        width: 12.5rem;
        height: 4.6875rem;
        background: ${props => props.theme.success};
        font-size: 1.25rem;
        font-weight: bold;
        color: ${props => props.theme.color};
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
        form .grid-columns {
            grid-template-columns: 1fr;
        }
        
        .button-total {
            flex-direction: column;
            align-items: center;
        }

        .freight-total {
            margin-bottom: 1rem;
        }

        form input#card-number {
            width: 11.875rem;
            
        }   

        form input#cpf {
            width: 11.875rem;
        }

        form input#tel {
            width: 11.875rem;
        }
    }

    @media (max-width: 400px) {
        .flex-row {
            flex-direction: column;
            align-items: center;
        }

        .cc-form {
            padding: 0 0 0.625rem 0;
        }
    }
`;

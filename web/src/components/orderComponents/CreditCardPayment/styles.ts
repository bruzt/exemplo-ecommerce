import styled from 'styled-components';

export const Container = styled.div`

    h2 {
        text-align: center;
        margin: 25px;
    }

    .cc-form {
        background: ${props => props.theme.primary};
        border-radius: 5px;
        padding: 10px;
    }

    form {
        padding: 20px 0 0 0;
    }

    form .grid-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        text-align: center;
        grid-gap: 5px;
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
        margin: 0 5px;
    }

    .flex-row p {
        font-size: 30px;
        align-self: center;
    }

    .w-100 {
        width: 100%;
    }

    form div {
        margin: 10px 0 0 0;
    }

    form input, select {
        height: 40px;
        border: 0;
        border-radius: 5px;
        padding: 3px;
        font-size: 20px;
    }

    .justify-center {
        justify-content: center;
    }

    form .holder-name-label {
        margin: 28px 0 0 0;
    }

    form input {
        text-align: center;
    }

    form input#card-holder-name {
        width: 100%;
        max-width: 400px;

        margin: 0 auto;
    }

    form input#card-number {
        width: 100%;
        max-width: 200px;
        align-self: center;
    }

    form input#cpf {
        width: 190px;
    }

    #cpf.invalid-value {
        border: 2px solid ${props => props.theme.danger};
    }

    form input#tel {
        width: 190px;
    }

    form input#card-cvv {
        width: 75px;
    }

    form input#card-expiration-month {
        width: 50px;
    }

    form input#card-expiration-year {
        width: 50px;
    }

    form button {
        width: 100px;
        height: 50px;
        margin: 20px 0 0 0;
    }

    form #street {
        width: 99%;

        margin: 0 auto;
    }

    form #number {
        width: 150px;
    }

    form #neighborhood {
        width: 100%;
    }

    form #city {
        width: 300px;
    }

    form #state {
        width: 100%;
        min-width: 65px;   
        background: #eee;
    }

    form #zipcode {
        width: 100%;
    }                

    .same-addr-button {
        justify-content: flex-end;
    }

    .same-addr-button button {
        justify-self: flex-end;
        border: 0;
        border-radius: 5px;
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
        font-size: 20px;
    }

    .button-total .freight-total {
        background: ${props => props.theme.primary};
        border-radius: 5px;
        padding: 10px;
    }

    .button-total .freight-total p + p + p {
        font-size: 30px;
        font-weight: bold;
    }

    .button-total select#installments {
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0}
    }

    .button-total button {
        border: 0;
        border-radius: 5px;
        width: 200px;
        height: 75px;
        background: ${props => props.theme.success};
        font-size: 20px;
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
        }

        form input#card-number {
            width: 190px;
            
        }   

        form input#cpf {
            width: 190px;
        }

        form input#tel {
            width: 190px;
        }
    }

    @media (max-width: 400px) {
        .flex-row {
            flex-direction: column;
            align-items: center;
        }

        .cc-form {
            padding: 0 0 10px 0;
        }
    }
`;

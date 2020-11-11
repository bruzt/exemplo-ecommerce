import styled from 'styled-components';

export const Container = styled.div`

    .cc-form {
        background: #0D2235;
        border-radius: 5px;
        padding: 10px;
    }

    h2 {
        text-align: center;
        margin: 20px;
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

    form input#card-holder-name {
        text-align: center;
    }

    form input#card-number {
        width: 190px;
        text-align: center;
        align-self: center;
    }

    form input#cpf {
        width: 190px;
        text-align: center;
    }

    #cpf.invalid-value {
        border: 2px solid #a32e39;
    }

    form input#tel {
        width: 190px;
        text-align: center;
    }

    form input#card-cvv {
        width: 50px;
        text-align: center;
    }

    form input#card-expiration-month {
        width: 50px;
        text-align: center;
    }

    form input#card-expiration-year {
        width: 50px;
        text-align: center;
    }

    form button {
        width: 100px;
        height: 50px;
        margin: 20px 0 0 0;
    }

    form #street {
        width: 100%;
    }

    form #number {
        width: 150px;
        
    }

    form #neighborhood {
        width: 100%;
    }

    form #city {
        width: 100%;
    }

    form #state {
        width: 100%;
        min-width: 65px;   
        background: #fff;
    }

    form #zipcode {
        width: 150px;
        text-align: center;
    }                

    .same-addr-button {
        justify-content: flex-end;
    }

    .same-addr-button button {
        justify-self: flex-end;
        border: 0;
        border-radius: 5px;
        background: #16324C;
        color: inherit;
        cursor: pointer;
    }

    .same-addr-button button:hover {
        background: #1C4061;
    }

    .same-addr-button button:active {
        background: #16324C;
    }

    .button-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
    }

    .button-total .freight-total {
        background: #0D2235;
        border-radius: 5px;
        padding: 10px;
    }

    .button-total .freight-total p + p + p {
        font-size: 30px;
        font-weight: bold;
    }

    .button-total button {
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

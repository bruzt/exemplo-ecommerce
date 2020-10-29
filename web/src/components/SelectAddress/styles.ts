import styled from 'styled-components';

export const Container = styled.section`

    min-height: 800px;
    padding: 20px 0;

    .back-button {
        border: 0;
        background: transparent;
        font-size: 30px;
        cursor: pointer;
        color: inherit;
    }

    h1 {
        text-align: center;
        margin: 20px;
    }

    .addr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;

        min-height: 220px;
        border: 1px solid #0D2235;
        border-radius: 5px;
        padding: 10px;
    }

    .addr-grid a {
        cursor: pointer;
    }

    .addr-card {
        border-radius: 5px;
        background: #0D2235;
        height: 220px;
    }

    .selected {
        border: 3px solid #3E8C34;

    }

    .selected.disabled {
        border: 3px solid #a32e39;
    }

    .addr-card .addr-data a div {
        padding: 15px;
        line-height: 25px;
        height: 100%;
    }

    .addr-card .addr-data .addr-remove {
        display: flex;
        justify-content: flex-end;
        margin: 10px 10px 0 0;
    }

    .addr-data .addr-remove button {
        font-weight: bold;
        padding: 4px 8px;
        border: 0;
        border-radius: 5px;
        background: #a32e39;
        cursor: pointer;
    }

    .addr-data .addr-remove button:hover {
        background: #bf2232;
    }

    .addr-data .addr-remove button:active {
        background: #a32e39;
    }

    .addr-data p {
        font-size: 20px;
        line-height: 30px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .add-select-buttons {
        display: flex;
        justify-content: space-between;
    }

    .add-select-buttons button {
        margin: 20px 0 0 0;
        width: 200px;
        height: 50px;
        border: 0;
        border-radius: 5px;
        font-size: 20px;
        cursor: pointer;                 
        color: inherit;   
    }

    .add-select-buttons .add-button {
        background: #0D2235;
    }

    .add-select-buttons .add-button:hover {
        background: #16324C;
    }

    .add-select-buttons .add-button:active {
        background: #0D2235;
    }
    
    .add-select-buttons .select-button {
        background: #3E8C34;
    }

    .add-select-buttons .select-button:hover {
        background: #41A933;
    }

    .add-select-buttons .select-button:active {
        background: #3E8C34;
    }

    .add-select-buttons .select-button:disabled {
        background: #a32e39;
        color: inherit;
    }

    .add-select-buttons .select-button:disabled:hover {
        background: #bf2232;
    }

    .add-addr-form {
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
        border-radius: 5px;
        padding: 20px;
        width: 480px;
        max-width: 50%;
        background: #0D2235;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .flex-row input {
        margin: 0 5px;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
        
    }

    .add-addr-form div {
        margin: 0 0 10px 0;
    }

    .add-addr-form label {
        margin: 0 0 0 5px;
    }

    .add-addr-form input, select {
        height: 30px;
        padding: 3px;
        font-size: 20px;
        border: 0;
        border-radius: 5px;
    }

    .add-addr-form #street {
        width: 100%;   
    }

    .add-addr-form #number {
        width: 100%;
        max-width: 150px;
    }

    .add-addr-form #district {
        width: 100%;
    }

    .add-addr-form #city {
        width: 240px;
        margin-right: 5px;
    }

    .add-addr-form #state {
        width: 100%;
        min-width: 65px;   
        background: #fff;
    }

    .add-addr-form #zipcode {
        width: 100%;
        text-align: center;
    }

    .addr-submit {
        width: 100%; 
        height: 40px;
        margin-top: 10px;
        align-self: center;
        border: 0;
        border-radius: 5px;
        background: #3E8C34;
        font-size: 20px;
        cursor: pointer;
        color: inherit;

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

    .go-payment-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    @media (max-width: 425px) {
        .addr-grid {
            grid-template-columns: 1fr;
        }

        .add-addr-form {
            max-width: 100%;
        }
    }
`;

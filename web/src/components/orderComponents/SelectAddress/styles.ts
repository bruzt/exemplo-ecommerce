import styled from 'styled-components';

export const Container = styled.section`

    min-height: 800px;
    padding: 20px 0;

    .back-button {
        border: 0;
        background: transparent;
        font-size: 30px;
        cursor: pointer;
        color: ${props => props.theme.color};
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
        border: 1px solid ${props => props.theme.primary};
        border-radius: 5px;
        padding: 10px;
    }

    .addr-grid a {
        cursor: pointer;
    }

    .addr-card {
        border-radius: 5px;
        background: ${props => props.theme.primary};
        height: 220px;
    }

    .selected {
        border: 3px solid ${props => props.theme.success};

    }

    .selected.disabled {
        border: 3px solid ${props => props.theme.danger};
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
        background: ${props => props.theme.danger};
        cursor: pointer;

        &:hover {
            background: ${props => props.theme.dangerActive};
        }

        &:active {
            background: ${props => props.theme.danger};
        }
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
        color: ${props => props.theme.color};;   
    }

    .add-select-buttons .add-button {
        background: ${props => props.theme.primary};

        &:hover {
            background: ${props => props.theme.secondary};
        }

        &:active {
            background: ${props => props.theme.primary};
        }
    }
    
    .add-select-buttons .select-button {
        background: ${props => props.theme.success};
        color: ${props => props.theme.color};

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


    .add-addr-form {
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
        border-radius: 5px;
        padding: 20px;
        width: 480px;
        max-width: 50%;
        background: ${props => props.theme.primary};
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
        background: #eee;
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
        background: ${props => props.theme.success};
        font-size: 20px;
        cursor: pointer;
        color: inherit;

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

    .go-payment-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    
    @media (max-width: 600px) {
        .addr-grid {
            grid-template-columns: 1fr;
        }

        .add-addr-form {
            max-width: 100%;
        }
    }

    @media (max-width: 400px) {
        .add-select-buttons,
        .flex-row {
            flex-direction: column;
            align-items: center;

        }
    }
`;

import styled from 'styled-components';

export const Container = styled.section`

    min-height: 50rem;

    .back-button {
        border: 0;
        background: transparent;
        font-size: 1.875rem;
        cursor: pointer;
        color: ${props => props.theme.color2};
    }

    h1 {
        text-align: center;
        margin-bottom: 1.5625rem;

        color: ${props => props.theme.color2};
    }

    .addr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0.625rem;

        min-height: 13.75rem;
        border: 1px solid ${props => props.theme.primary};
        border-radius: 0.3125rem;
        padding: 0.625rem;
    }

    .addr-grid a {
        cursor: pointer;
    }

    .addr-card {
        border-radius: 0.3125rem;
        background: ${props => props.theme.primary};
        height: 13.75rem;
    }

    .selected {
        border: 0.1875rem solid ${props => props.theme.success};

    }

    .selected.disabled {
        border: 0.1875rem solid ${props => props.theme.danger};
    }

    .addr-card .addr-data a div {
        padding: 0.9375rem;
        line-height: 1.5625rem;
        height: 100%;
    }

    .addr-card .addr-data .addr-remove {
        display: flex;
        justify-content: flex-end;
        margin: 0.625rem 0.625rem 0 0;
    }

    .addr-data .addr-remove button {
        font-weight: bold;
        padding: 0.25rem 0.5rem;
        border: 0;
        border-radius: 0.3125rem;
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
        font-size: 1.25rem;
        line-height: 1.875rem;

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
        margin: 1.25rem 0 0 0;
        width: 12.5rem;
        height: 3.125rem;
        border: 0;
        border-radius: 0.3125rem;
        font-size: 1.25rem;
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
        margin: 1.25rem 0 0 0;
        border-radius: 0.3125rem;
        padding: 1.25rem;
        width: 30rem;
        max-width: 50%;
        background: ${props => props.theme.primary};
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    
    .flex-row input {
        margin: 0 0.3125rem;
    }
    
    .flex-column {
        display: flex;
        flex-direction: column;
        
    }
    
    .add-addr-form div {
        margin: 0 0 0.625rem 0;
    }
    
    .add-addr-form label {
        margin: 0 0 0 0.3125rem;
    }
    
    .add-addr-form input, 
    .add-addr-form select {
        height: 2.5rem;
        
        padding: 0.1875rem;
        font-size: 1.25rem;
        border: 0;
        border-radius: 0.3125rem;
    }

    .add-addr-form #street {
        width: 100%;   
    }

    .add-addr-form #number {
        width: 100%;
        max-width: 9.375rem;
    }

    .add-addr-form #district {
        width: 100%;
    }

    .add-addr-form #city {
        width: 15rem;
        margin-right: 0.3125rem;
    }

    .add-addr-form #state {
        width: 100%;
        min-width: 4.0625rem;   
        background: #eee;
    }

    .add-addr-form #zipcode {
        width: 100%;
        text-align: center;
    }

    button.addr-submit {
        width: 100%; 
        height: 3rem;

        margin-top: 0.625rem;
        align-self: center;

        border: 0;
        border-radius: 0.3125rem;

        background: ${props => props.theme.success};

        font-size: 1.25rem;
        cursor: pointer;
        color: inherit;

        &.is-fetching {
            font-size: 0;
            padding-top: 0.5rem;
        }

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

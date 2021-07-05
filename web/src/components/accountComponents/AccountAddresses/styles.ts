import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .w-100 {
        width: 100%;
    }

    h1 {
        margin-bottom: 1.25rem;
        font-size: 1.875rem;
    }

    div.address-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0.625rem;
    }

    div.address-card {
        background: ${props => props.theme.primary};
        padding: 0.625rem;
        border-radius: 0.3125rem;
        height: 12.5rem;
    }

    div.card-header {
        display: flex;
        justify-content: flex-end;
    }

    div.card-header button {
        border: 0;
        border-radius: 0.3125rem;
        padding: 0.3125rem 0.625rem;
        background: ${props => props.theme.danger};
        cursor: pointer;
        color: inherit;
    }

    div.card-header button:hover {
        background: ${props => props.theme.dangerActive};
    }

    div.card-header button:active {
        background: ${props => props.theme.danger};
    }

    div.card-body {
        margin-top: 0.3125rem;
    }

    div.card-body p {
        line-height: 1.875rem;
        font-size: 1.125rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    form {
        margin-top: 1.875rem;
        background: ${props => props.theme.primary};
        border-radius: 0.3125rem;
        padding: 0.625rem;
        width: 100%;
        max-width: 31.25rem;
    }

    form h2 {
        text-align: center;
    }

    div.input-group {
        margin-top: 0.625rem;
        display: flex;
        flex-direction: column;
    }

    div.line-group {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    form label {
        margin-left: 0.3125rem;
    }

    form input, form select {
        border: 0;
        border-radius: 0.3125rem;
        height: 2.5rem;
        font-size: 1.25rem;
        padding: 0.3125rem;
    }

    input#street {
        width: 100%;
    }

    input#number {
        width: 100px;
        margin-right: 0.625rem;
    }

    input#neighborhood {
        width: 100%;
    }

    select#city {
        width: 12.5rem;
    }

    select#uf {
        width: 100px;
    }

    input#zipcode {
        width: 100%;
    }

    .line-group select {
        margin-right: 0.625rem;
    }

    form button[type='submit'] {
        margin-top: 1.25rem;
        border: 0;
        border-radius: 0.3125rem;
        padding: 0.625rem 1.25rem;
        font-size: 1.25rem;
        background: ${props => props.theme.success};
        color: inherit;
        cursor: pointer;
    }

    form button[type='submit']:hover {
        background: ${props => props.theme.successActive};
    }

    form button[type='submit']:active {
        background: ${props => props.theme.success};
    }

    form button[type='submit']:disabled {
        background: ${props => props.theme.danger};
    }

    form button[type='submit']:disabled:hover {
        background: ${props => props.theme.dangerActive};
    }

    @media (max-width: 768px) {
        div.address-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 400px) {
        div.line-group {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

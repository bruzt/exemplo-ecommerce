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
        margin-bottom: 20px;
        font-size: 30px;
    }

    div.address-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }

    div.address-card {
        background: #0D2235;
        padding: 10px;
        border-radius: 5px;
        height: 200px;
    }

    div.card-header {
        display: flex;
        justify-content: flex-end;
    }

    div.card-header button {
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
        background: #a32e39;
        cursor: pointer;
        color: inherit;
    }

    div.card-header button:hover {
        background: #bf2232;
    }

    div.card-header button:active {
        background: #a32e39;
    }

    div.card-body {
        margin-top: 5px;
    }

    div.card-body p {
        line-height: 30px;
        font-size: 18px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    form {
        margin-top: 30px;
        background: #0D2235;
        border-radius: 5px;
        padding: 10px;
        width: 100%;
        max-width: 500px;
    }

    form h2 {
        text-align: center;
    }

    div.input-group {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
    }

    div.line-group {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    form label {
        margin-left: 5px;
    }

    form input, form select {
        border: 0;
        border-radius: 5px;
        height: 40px;
        font-size: 20px;
        padding: 5px;
    }

    input#street {
        width: 100%;
    }

    input#number {
        width: 100px;
        margin-right: 10px;
    }

    input#neighborhood {
        width: 100%;
    }

    select#city {
        width: 200px;
    }

    select#uf {
        width: 100px;
    }

    input#zipcode {
        width: 100%;
    }

    .line-group select {
        margin-right: 10px;
    }

    form button[type='submit'] {
        margin-top: 20px;
        border: 0;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 20px;
        background: #3E8C34;
        color: inherit;
        cursor: pointer;
    }

    form button[type='submit']:hover {
        background: #41A933;
    }

    form button[type='submit']:active {
        background: #3E8C34;
    }

    form button[type='submit']:disabled {
        background: #a32e39;
    }

    form button[type='submit']:disabled:hover {
        background: #bf2232;
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

import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    min-height: 31.25rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form {
        width: 100%;
        max-width: 18.75rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    form label {
        margin: 0.625rem 0 0 0.3125rem;
    }

    form input {
        height: 2.5rem;
        border: 0;
        border-radius: 0.3125rem;
        padding: 0.3125rem;
        font-size: 1.25rem;
    }

    form button {
        margin: 1.25rem 0 0 0;
        height: 3.125rem;
        font-size: 1.25rem;
        border: 0;
        border-radius: 0.3125rem;
        cursor: pointer;
        background: #3E8C34;
        color: inherit; 
    }

    form button:hover {
        background: #41A933;
    }

    form button:active {
        background: #3E8C34;
    }

    form button:disabled {
        background: #a32e39;
    }

    form button:disabled:hover {
        background: #bf2232;
    }
`;

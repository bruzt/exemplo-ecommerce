import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    min-height: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form {
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    form label {
        margin: 10px 0 0 5px;
    }

    form input {
        height: 40px;
        border: 0;
        border-radius: 5px;
        padding: 5px;
        font-size: 20px;
    }

    form button {
        margin: 20px 0 0 0;
        height: 50px;
        font-size: 20px;
        border: 0;
        border-radius: 5px;
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

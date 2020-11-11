import styled from 'styled-components';

export const Container = styled.section`

    min-height: 800px;
    padding: 20px 0;
    
    h1 {
        text-align: center;
        margin: 20px;
    }

    .back-button {
        border: 0;
        background: transparent;
        font-size: 30px;
        cursor: pointer;
        color: inherit;
    }

    .cc-boleto-buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .cc-boleto-buttons button {
        font-size: 30px;
        padding: 20px 30px;
        margin: 10px;
        border: 0;
        border-radius: 5px;
        color: #0D2235;
        cursor: pointer;
    }

    .cc-boleto-buttons button:hover, .cc-boleto-buttons button.active {
        background: #0D2235;
        color: #eee;
    }
`;

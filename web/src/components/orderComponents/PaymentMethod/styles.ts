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
        color: ${props => props.theme.color};
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
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 5px;
        color: ${props => props.theme.primary};
        cursor: pointer;

        &:hover, 
        &.active {
            background: ${props => props.theme.primary};
            color: ${props => props.theme.color};
        }
    }


    @media (max-width: 600px) {
        .cc-boleto-buttons {
            flex-direction: column;
        }
    }
`;

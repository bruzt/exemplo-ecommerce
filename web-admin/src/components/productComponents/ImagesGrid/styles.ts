import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;

    div.img-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1px;

        width: 100%;
    }

    div.img-grid div.img-card {
        display: flex;
        border: 1px solid ${props => props.theme.secondary};
    }

    div.img-card div.img-container {
        width: 100%;
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.img-card div.img-container img {
        width: auto;
        max-width: 100%;
        height: 100%;
        max-height: 100px;
    }

    div.img-card button {
        border: 0;
        padding: 0 5px;
        font-size: 20px;
        cursor: pointer;

        color: ${props => props.theme.color};
        background: ${props => props.theme.danger};

        &:hover {
            background: ${props => props.theme.dangerActive};
        }

        &:active {
            background: ${props => props.theme.danger};
        }
    }
`;

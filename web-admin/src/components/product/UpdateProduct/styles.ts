import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;

    z-index: 10;
    width: 100%;
    height: 100%;
    margin-top: -10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: rgba(1, 1, 1, 0.5);

    & > form {
        background: ${props => props.theme.primary};
        border-radius: 4px;

        margin-top: 10%;
        padding: 20px;
        width: 800px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & > form > * {
        margin-bottom: 20px;
    }

    & > form header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    & > form div.input-group {
        display: flex;
        flex-direction: column;

        width: 100%;
    }

    div.input-group label {
        font-size: 20px;
    }

    div.input-group input {
        border: 0;
        border-radius: 4px;
        height: 40px;
        font-size: 20px;
        padding: 0 5px;
        text-align: center;
    }

    div.input-group textarea {
        border: 0;
        border-radius: 4px;
        height: 60px;
        font-size: 16px;
        padding: 5px;
        resize: none;
    }

    & > form header button {
        border: 0;
        border-radius: 4px;
        padding: 0 5px;
        cursor: pointer;
        font-size: 20px;

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

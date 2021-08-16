import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(1, 1, 1, 0.5);

    display: flex;
    justify-content: center;

    form {
        width: 500px;
        height: fit-content;

        margin-top: 200px;
        background: ${(props) => props.theme.primary};
        border-radius: 4px;
        padding: 10px;
    }

    form header {
        width: 100%;

        display: flex;
        justify-content: flex-end;
    }

    header button {
        cursor: pointer;

        padding: 6px 9px;

        border: 0;
        border-radius: 4px;

        background: ${props => props.theme.danger};

        color: ${props => props.theme.color};
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background-color 0.2s;

        &:hover {
            background: ${props => props.theme.dangerActive};
        }

        &:active {
            background: ${props => props.theme.danger};
        }
    }

    form main {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding-bottom: 20px;
    }

    main > * {
        margin-top: 20px;
    }

    main h3 {
        font-size: 30px;
    }

    main div.input-group {
        display: flex;
        flex-direction: column;
    }

    div.input-group select {
        width: 250px;
        height: 40px;
        font-size: 20px;

        border: 0;
        border-radius: 4px;
    }

    main button {
        width: 250px;

        &.is-fetching {
            font-size: 0;
        }
    }
`;

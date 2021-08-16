import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    z-index: 10;

    width: 100%;
    height: 100vh;
    
    background: rgba(1,1,1,0.5);

    display: flex;
    justify-content: center;

    form {
        margin-top: calc(100vh - 45%);
        background: ${props => props.theme.primary};
        border-radius: 4px;

        width: 500px;
        height: max-content;
    }

    header {
        display: flex;
        justify-content: flex-end;
    }

    header button {
        cursor: pointer;

        margin: 10px 10px 0 0;
        padding: 6px 9px;

        border: 0;
        border-radius: 4px;

        background: ${props => props.theme.danger};

        color: ${props => props.theme.color};
        font-weight: bold;

        &:hover {
            background: ${props => props.theme.dangerActive};
        }

        &:active {
            background: ${props => props.theme.danger};
        }
    }

    form main {
        height: 100%;
        padding: 20px;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    main > * {
        margin-bottom: 20px;
    }

    main div.input-group {
        display: flex;
        flex-direction: column;
    }

    div.input-group input,
    div.input-group select {
        width: 300px;
        height: 40px;
        border: 0;
        border-radius: 4px;
        padding-left: 5px;
        font-size: 20px;
    }

    form button[type=submit] {
        width: 300px;

        margin-top: 9px;

        &.is-fetching {
            font-size: 0;
        }
    }
`;

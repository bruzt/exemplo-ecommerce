import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    form {
        width: 400px;
        background: ${(props) => props.theme.primary};
        padding: 20px;
        border-radius: 4px;

        display: flex;
        flex-direction: column;
    }

    form > * {
        margin-bottom: 20px;
    }

    form div.input-group {
        display: flex;
        flex-direction: column;
    }

    div.input-group label {
        font-size: 20px;
    }

    div.input-group input {
        border: 0;
        border-radius: 4px;
        height: 40px;

        padding: 0 5px;
        font-size: 20px;
    }

    form button {
        margin: 0 auto;
        width: 100%;

        &.is-fetching {
            font-size: 0;
        }

        &:disabled {
            background: ${props => props.theme.danger};
        }
    }
`;

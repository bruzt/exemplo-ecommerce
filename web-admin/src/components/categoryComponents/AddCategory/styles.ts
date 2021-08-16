import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        margin: 50px 0;
    }

    form {
        width: 500px;
        
        padding: 32px;

        background: ${(props) => props.theme.primary};
        border-radius: 4px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form > * + * {
        margin-top: 16px;
    }

    form div.input-box {
        display: flex;
        flex-direction: column;
    }

    div.input-box label {
        font-size: 20px;
    }

    div.input-box input, select {
        width: 300px;
        height: 40px;
        border: 0;
        border-radius: 4px;
        font-size: 20px;
        padding: 4px;
    }

    form button {
        width: 300px;
        margin-top: 24px;

        &.is-fetching {
            font-size: 0;
        }
    }
`;

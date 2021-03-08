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
        height: 250px;
        background: ${(props) => props.theme.primary};
        border-radius: 4px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
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

    .categoryTree {
        width: 500px;

        margin-top: 50px;
    }

    .categoryTree details > details {
        margin: 5px 0 0 10px;
    }

    .categoryTree .last-child {
        list-style: none;

        margin-left: 5px;
    }
`;

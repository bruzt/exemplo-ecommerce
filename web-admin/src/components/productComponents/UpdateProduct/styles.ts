import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 150px);
    overflow-y: scroll;

    z-index: 100;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: rgba(1, 1, 1, 0.5);

    & > form {
        background: ${props => props.theme.primary};
        border-radius: 4px;

        margin: 5% 0;
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

    div.input-group > label {
        font-size: 20px;
    }

    div.input-group > input,
    div.input-group > select {
        width: 100%;
        height: 30px;

        border: 0;
        border-radius: 4px;
        font-size: 20px;
        padding: 0 5px;
        text-align: center;
    }

    & > form div.product-tangible-group  {
        width: 75px;
    }

    div.input-group > textarea {
        border: 0;
        border-radius: 4px;
        height: 60px;
        font-size: 16px;
        padding: 5px;
        resize: none;
    }

    & > form > header button {
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

    & > form div.form-row {
        width: 100%;

        display: flex;
        justify-content: space-between;
    }

    div.form-row > div.input-group + div.input-group {
        margin-left: 5px;
    }

    section.text-editor {
        width: 100%;
    }

    button[type=submit] {
        margin-top: 16px;
    }


    div.preview {
        width: 100%;
        max-width: 700px;

        display: flex;
        flex-direction: column;
    }

    div.preview hr {
        width: 100%;

        margin: 20px 0;
    }

    div.preview h2 {
        text-decoration: underline;
        margin: 0 auto;
    }
`;

import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;

    form {
        background: ${(props) => props.theme.primary};
        border-radius: 4px;
        padding: 30px;
        width: 830px;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    form > * {
        margin-top: 20px;
    }

    form div.input-group {
        display: flex;
        flex-direction: column;
    }

    form input {
        height: 30px;
        border: 0;
        text-align: center; 
    }

    form textarea {
        height: 60px;
        border: 0;
        resize: none;
    }

    form input, textarea, select {
        border-radius: 4px;
        width: 100%;
        padding: 5px;
        font-size: 16px;
    }

    /*form select {
        width: 65px;
    }*/

    form div.form-line {
        display: flex;
        justify-content: space-evenly;
    }

    div.form-line div.input-group + div.input-group {
        margin-left: 5px;
    }

    form button {
        align-self: center;
    }

    div.html-text {
        width: 100%;
        max-width: 800px;
        height: 100%;

        margin-top: 50px;
        border: 1px dashed ${(props) => props.theme.primary};
        overflow-x: hidden;
        
        .se-video-container figure {
            height: 450px !important;
            padding-bottom: 0 !important;
        }
        a, a:visited {
            color: inherit;
        }
    }
`;

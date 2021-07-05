import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    @media (max-width: 1080px){
        html {
            font-size: 93.75%;
        }
    }

    @media (max-width: 720px){
        html {
            font-size: 87.5%;
        }
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: ${props => props.theme.background};
        color: ${props => props.theme.color};
        font: 400 1rem Roboto, Arial, Helvetica, sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    input, select, textarea, button {
        font: inherit;
    }

    button {
        cursor: pointer;
    }

    input, select, textarea {
        background: #eee;
    }
`;

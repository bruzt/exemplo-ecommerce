import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 30px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 600px;
        background: ${props => props.theme.primary};
        border-radius: 5px;
        padding: 20px 10px;
    }

    div.form-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
    }

    label {
        margin-left: 5px; 
        margin-top: 20px;
    }

    label span {
        font-size: 14px;
    }

    input {
        width: 100%;
        height: 40px;
        padding: 5px;
        font-size: 20px;
        border: 0;
        border-radius: 5px;
    }

    div.change-password-group {
        width: 100%;
        max-width: 300px;
        margin-top: 20px;
    }

    div.change-password-group h2 {
        margin-bottom: -10px;
    }

    button[type='submit'] {
        width: 100%;
        max-width: 300px;
        margin-top: 30px;
        font-size: 30px;
        padding: 5px 10px;
        border: 0;
        border-radius: 5px;
        background: ${props => props.theme.success};
        color: inherit;
        cursor: pointer;
    }

    button[type='submit']:hover {
        background: ${props => props.theme.successActive};
    }

    button[type='submit']:active {
        background: ${props => props.theme.success};
    }

    button[type='submit']:disabled {
        background: ${props => props.theme.danger};  
    }

    button[type='submit']:disabled:hover {
        background: ${props => props.theme.dangerActive};  
    }
`;

import styled from 'styled-components';

export const Container = styled.section`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        width: fit-content;
        display: flex;
        margin: 20px 0;
    }

    & > form input,
    & > form button {
        height: 40px;
        font-size: 20px;
        border: ${props => props.theme.title == 'dark' ? '0' : `1px solid ${props.theme.color}`};
    }

    & > form input {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        width: 350px;
        padding: 0 5px;
    }

    & > form button {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        width: 30px;
        cursor: pointer;
    }

    table {
        margin-top: 20px;
        font-size: 20px;
        border-spacing: 0 5px;
    }

    table td {
        text-align: center;
        line-height: 50px;
        background: ${(props) => props.theme.primary};
    }

    table td:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    table td:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    div.img-container {
        width: 100px;
        height: 50px;
    }

    div.img-container img {
        width: auto;
        height: auto;
        max-width: 100px;
        max-height: 50px;
        overflow: hidden;
    }

    td.name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    td#td-actions div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    td#td-actions button {
        height: 100%;
        border: none;
        padding: 2px;
        cursor: pointer;    
        border-radius: 2px;
        background: transparent;
    }
`;

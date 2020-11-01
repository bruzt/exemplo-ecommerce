import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    padding-top: 50px;

    height: 100%;
    min-height: 100vh;

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

    #td-actions div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    #td-actions button {
        cursor: pointer;
        background: transparent;
        border: 0;
    }

    tr {
        text-align: center;
    }
`;

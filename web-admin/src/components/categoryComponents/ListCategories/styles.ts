import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    min-height: 100vh;

    h2 {
        margin-top: 50px;
    }

    table {
        margin-top: 50px;
        font-size: 20px;
        border-spacing: 0 1px;
    }

    table thead tr {
        background: ${(props) => props.theme.primary};
        height: 40px;
    }

    table tbody tr {
        background: ${(props) => props.theme.secondary};
    }

    table td {
        text-align: center;
        line-height: 50px;
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

export const CategoryMenuPreview = styled.nav`

`;

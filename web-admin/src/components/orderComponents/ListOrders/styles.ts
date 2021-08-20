import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
        margin-top: 50px;
    }

    table {
        border-spacing: 0 1px;
        line-height: 20px;
        font-size: 20px;

        margin: 32px 0 32px 0;
    }

    table thead tr {
        background: ${props => props.theme.primary};
        height: 40px;
    }

    table tbody tr {
        background: ${props => props.theme.secondary};
    }

    td.actions {
        display: flex;
        justify-content: space-evenly;
    }

    table td {
        height: 50px;
        text-align: center;
    }

    td div.status {
        width: fit-content;
        margin: 0 auto;
        padding: 5px 10px;
        border-radius: 4px;
    }

    td div.waiting_payment {
        background: ${props => props.theme.warning};
        color: #111;
    }

    td div.paid {
        background: ${props => props.theme.success};
    }

    td div.dispatch {
        background: ${props => props.theme.dangerActive};
    }

    td div.sent {
        background: ${props => props.theme.success};
    }

    td div.received {
        background: ${props => props.theme.successActive};
    }

    td div.refused {
        background: ${props => props.theme.danger};
    }

    td button {
        cursor: pointer;
        background: transparent;
        border: 0;
    }
`;

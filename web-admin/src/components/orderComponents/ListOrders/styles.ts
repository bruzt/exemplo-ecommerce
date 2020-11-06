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

        margin-top: 50px;
    }

    table thead tr {
        background: ${props => props.theme.primary};
        height: 40px;
    }

    table tbody tr {
        background: ${props => props.theme.secondary};
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

    td div.awaiting-payment {
        background: ${props => props.theme.danger};
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
`;

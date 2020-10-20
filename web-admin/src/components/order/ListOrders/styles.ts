import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 10px;
    padding-top: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    table {
        border-spacing: 0 5px;
        line-height: 20px;
        font-size: 20px;
    }

    table td {
        background: ${props => props.theme.primary};
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

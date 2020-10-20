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
        text-align: center;
        background: ${props => props.theme.primary};
        height: 50px;
    }

    table td.awaiting-payment {
        background: ${props => props.theme.danger};
    }

    table td.paid {
        background: ${props => props.theme.success};
    }

    table td.dispatch {
        background: ${props => props.theme.dangerActive};
    }

    table td.sent {
        background: ${props => props.theme.success};
    }

    table td.received {
        background: ${props => props.theme.successActive};
    }
`;

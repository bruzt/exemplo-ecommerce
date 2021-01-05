import styled from 'styled-components';

export const Container = styled.div`

    background: ${props => props.theme.secondary};

    .countdown {
        width: 100%;
        height: 50px;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .countdown span {
        margin-left: 10px;
    }
`;

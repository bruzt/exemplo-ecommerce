import styled from 'styled-components';

export const Container = styled.div`

    background: ${props => props.theme.secondary};

    border-radius: 5px 5px 0 0;

    .countdown {
        width: 100%;
        height: 50px;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

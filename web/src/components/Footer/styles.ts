import styled from 'styled-components';

export const Container = styled.footer`
    height: 200px;
    bottom: 0;
    background: ${props => props.theme.primary};
    color: ${props => props.theme.color};
    margin: 5px 0 0 0;

    display: flex;
    justify-content: center;
    align-items: center;
`;

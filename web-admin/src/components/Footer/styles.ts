import styled from 'styled-components';

export const Container = styled.footer`
    height: 100px;
    background: ${(props) => props.theme.primary};
    border-top: 1px solid ${(props) => props.theme.secondary};

    display: flex;
    justify-content: center;
    align-items: center;
`;

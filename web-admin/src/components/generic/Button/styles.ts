import styled from 'styled-components';

export const StyledButton = styled.button`
    width: 200px;
    height: 50px;
    font-size: 20px;
    background: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.color};
    border: 0;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.background};
    }

    &:active {
        background: ${(props) => props.theme.secondary};
    }
`;

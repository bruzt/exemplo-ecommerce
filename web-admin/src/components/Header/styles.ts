import styled from 'styled-components';

export const Container = styled.header`
    height: 50px;
    background: ${(props) => props.theme.primary};
    border-bottom: 1px solid ${(props) => props.theme.secondary};
    padding: 0 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        padding: 5px 10px;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: ${(props) => props.theme.color};
        background: ${(props) => props.theme.background};

        &:hover {
            background: ${(props) => props.theme.secondary};
        }

        &:active {
            background: ${(props) => props.theme.background};
        }
    }
`;

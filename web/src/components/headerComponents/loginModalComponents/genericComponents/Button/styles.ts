import styled from 'styled-components';

export const StyledButton = styled.button`
    width: 18.75rem;
    height: 3.125rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 0;
    border-radius: 0.3125rem;
    
    margin: 1.875rem 0 0 0;
    background: ${props => props.theme.success};

    font-size: 1.25rem;
    color: ${props => props.theme.color};

    cursor: pointer;

    &.is-fetching {
        font-size: 0;
    }

    &:hover {
        background: ${props => props.theme.successActive};
    }

    &:active {
        background: ${props => props.theme.success};
    }

    &:disabled {
        background: ${props => props.theme.danger};
    }

    &:disabled:hover {
        background: ${props => props.theme.dangerActive};
    }
`;
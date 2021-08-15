import styled from 'styled-components';

export const StyledInput = styled.input`
    width: 100%;
    height: 2.5rem;
    font-size: 1.25rem;
    padding: 0.3125rem;
    border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
    border-radius: 0.3125rem;

    &.invalid {
        border: 0.125rem solid ${props => props.theme.danger};
    }
`;
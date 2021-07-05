import styled from 'styled-components';

export const Container = styled.section`

    min-height: calc(100vh - 31.25rem);

    display: flex;
    flex-direction: column;
    align-items: center;
                
    * {
        margin: 1.25rem 0;
    }

    h2 {
        text-align: center;
    }

    a {
        background: ${props => props.theme.primary};
        color: ${props => props.theme.color};
        font-size: 1.25rem;
        padding: 0.625rem 1.25rem;
        border-radius: 0.3125rem;

        &:hover {
            background: ${props => props.theme.secondary};
        }

        &:active {
            background: ${props => props.theme.primary};
        }
    }
`;

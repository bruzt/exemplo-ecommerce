import styled from 'styled-components';

export const Container = styled.section`

    padding: 20px 0;
    min-height: calc(100vh - 350px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
                
    * {
        margin: 20px 0;
    }

    h2 {
        text-align: center;
    }

    a {
        background: ${props => props.theme.primary};
        color: ${props => props.theme.color};
        font-size: 20px;
        padding: 10px 20px;
        border-radius: 5px;

        &:hover {
            background: ${props => props.theme.secondary};
        }

        &:active {
            background: ${props => props.theme.primary};
        }
    }
`;

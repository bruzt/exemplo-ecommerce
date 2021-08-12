import styled from 'styled-components';

export const Container = styled.div`
    
    min-height: 50rem;

    padding-top: 1.25rem;

    div.product-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 1.25rem 0;
        grid-gap: 0.3125rem;
        justify-items: center;
    }

    .filter-row {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 1.25rem;
    }

    .filter-row p {
        color: ${props => props.theme.color2};
    }

    .filter-row  #filter {
        font-size: inherit;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 0.25rem;
        cursor: pointer;
    }

    h2 {
        margin-top: 3.125rem;
        text-align: center;
    }

    @media (max-width: 1110px) {

        div.product-grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (max-width: 855px) {

        div.product-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 570px) {

        div.product-grid {
            grid-template-columns: 1fr;
        }
    }
`;

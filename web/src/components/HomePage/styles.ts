import styled from 'styled-components';

export const Container = styled.section`
    
    min-height: 800px;

    div.product-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 20px 0;
        grid-gap: 5px;

        justify-items: center;
    }

    h3 {
        margin: 20px 0 0 0;
    }

    @media (max-width: 1110px) {

        h3 {
            text-align: center;
        }

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
        padding: 0;

        div.product-grid {
            grid-template-columns: 1fr;
        }
    }
`;

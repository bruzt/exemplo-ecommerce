import styled from 'styled-components';

export const Container = styled.div`
    
    min-height: 800px;

    div.product-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        padding: 20px 0;
        grid-gap: 5px;
        justify-items: center;
    }

    .filter-row {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 20px 0 0 0;
        font-size: 20px;
    }

    .filter-row  #filter {
        font-size: inherit;
        border: 0;
        border-radius: 2px;
    }

    h2 {
        margin-top: 50px;
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

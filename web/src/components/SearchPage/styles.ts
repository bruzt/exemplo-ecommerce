import styled from 'styled-components';

export const Container = styled.div`
    
    min-height: 800px;

    .product-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
        padding: 20px 0;
        grid-gap: 20px;
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

    @media (max-width: 1200px) {
        padding: 0;

        .product-grid {
            grid-template-columns: 1fr 1fr 1fr;
            padding: 10px;
            grid-gap: 10px;
        }
    }

    @media (max-width: 900px) {
        padding: 0;

        .product-grid {
            grid-template-columns: 1fr 1fr;
            padding: 5px;
            grid-gap: 5px;
        }
    }

    @media (max-width: 600px) {
        padding: 0;

        .product-grid {
            grid-template-columns: 1fr;
            padding: 0;
            grid-gap: 0;
        }
    }
`;

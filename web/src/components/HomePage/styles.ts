import styled from 'styled-components';

export const Container = styled.section`
    
    min-height: 800px;

    .p-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
        padding: 20px 0;
        grid-gap: 20px;
    }

    h3 {
        margin: 20px 0 0 0;
    }

    @media (max-width: 1200px) {
        .p-grid {
            grid-template-columns: 1fr 1fr 1fr;
            padding: 10px;
            grid-gap: 10px;
        }
    }

    @media (max-width: 900px) {
        .p-grid {
            grid-template-columns: 1fr 1fr;
            padding: 5px;
            grid-gap: 5px;
        }
    }

    @media (max-width: 600px) {
        .p-grid {
            grid-template-columns: 1fr;
            padding: 0;
            grid-gap: 5px;
        }
    }
`;

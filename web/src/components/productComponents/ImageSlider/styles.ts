import styled from 'styled-components';

export const Container = styled.div`

    .img-container {
        width: 100%;
        max-width: 43.75rem;
        height: 100%;
        max-height: 25rem;
        z-index: 0;
    }

    .carousel {
        z-index: 0;
    }

    .img-container img {
        width: auto;
        max-width: 43.75rem;
        height: auto;
        max-height: 20.625rem;
    }

    .thumb-container {
        width: 4.375rem;
        height: 2.5rem;

        background: #0D2235;
    }

    .thumb-container img {
        
        width: auto;
        max-width: 4.375rem;
        height: auto;
        max-height: 2.5rem;

        display: block;
        margin: 0 auto;
    }
`;

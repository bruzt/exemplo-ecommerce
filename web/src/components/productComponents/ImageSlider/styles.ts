import styled from 'styled-components';

export const Container = styled.div`

    .img-container {
        width: 100%;
        max-width: 700px;
        height: 100%;
        max-height: 400px;
        z-index: 0;
    }

    .carousel {
        z-index: 0;
    }

    .img-container img {
        width: auto;
        max-width: 700px;
        height: auto;
        max-height: 330px;
    }

    .thumb-container {
        width: 70px;
        height: 40px;

        background: #0D2235;
    }

    .thumb-container img {
        
        width: auto;
        max-width: 70px;
        height: auto;
        max-height: 40px;

        display: block;
        margin: 0 auto;
    }
`;

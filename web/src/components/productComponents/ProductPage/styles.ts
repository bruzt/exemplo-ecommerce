import styled from 'styled-components';

export const Container = styled.section`
    min-height: 50rem;
    
    display: grid;
    grid-template-columns: 1fr 25rem;
    grid-template-rows: 3.75rem minmax(2.5rem, auto) 26.5625rem auto 1fr;
    grid-template-areas: 
        "breadcrumb breadcrumb"
        "title title"
        "slider-container buy-card-container"
        "description buy-card-container"
        "html-body buy-card-container"
    ;

    div.breadcrumb {
        grid-area: breadcrumb;
        padding: 0.625rem;
        background: ${props => props.theme.primary};
        border-bottom-right-radius: 0.3125rem;
        border-bottom-left-radius: 0.3125rem;
        margin-bottom: 1.25rem;
        font-size: 1.125rem;
    }

    div.breadcrumb a {
        cursor: pointer;
    }

    h1 {
        grid-area: title;

        color: ${props => props.theme.color2};
        font-size: 2rem;

        text-align: center;
        margin-bottom: 1.25rem;
    }

    div.img-slider-container,
    div.description,
    div.html-body {
        padding: 0.625rem;
        background: ${props => props.theme.secondary};
    }

    div.img-slider-container {
        grid-area: slider-container;

        width: 100%;
        max-width: 43.75rem;
    }

    .img-container {
        height: 25rem;
        
        display: flex;
        justify-content: center;
    }

    .buy-card-container {
        grid-area: buy-card-container;
        height: 100%;
        margin: 0;

        display: flex;
    }

    .buy-card {
        position: sticky;
        top: 0.3125rem;

        width: 100%;
        height: fit-content;

        margin-left: 0.625rem;
    }

    .buy-card .buy-card-infos {
        height: 100%;

        background: ${props => props.theme.primary};
        padding: 0.625rem;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        & > * {
            margin-top: 1.25rem;
        }
    }

    .countdown span {
        margin-left: 0.625rem;
        font-size: 1.5625rem;
    }

    .buy-card .price {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .buy-card .original-price {
        text-decoration: line-through;
    }

    .buy-card .total {
        font-size: 1.875rem;
        font-weight: bold;
    }

    .buy-card .discount {
        background: ${props => props.theme.success};
        padding: 0.625rem 1.25rem;
    }

    .buy-card .lacking {
        background: ${props => props.theme.danger};
        padding: 0.625rem 1.25rem;
    }

    .buy-card input#qtd {
        width: 2.8125rem;
        height: 1.875rem;
        font-size: 1.25rem;
        border: 0;
        border-radius: 0.3125rem;
        padding: 0.1875rem;
    }

    .buy-card button {
        width: 100%;
        height: 3.125rem;
        border: 0;
        border-radius: 0.3125rem;
        cursor: pointer;
        font-size: 1.25rem;
        font-weight: bold;
        color: inherit;
        background: ${props => props.theme.success};

        transition: background-color .5s;

        &:hover {
            background: ${props => props.theme.successActive};
        }

        &:active {
            background: ${props => props.theme.success};
        }

        &:disabled {
            background: ${props => props.theme.danger};
        }
    }

    .buy-card button p {
        margin-top: 0.3125rem;
    }

    .description {
        grid-area: description;
        padding: 0.625rem 0;
        line-height: 1.5625rem;
    }

    div.html-body {
        grid-area: html-body;

        width: 100%;
        max-width: 43.75rem;
        height: 100%;

        overflow-x: hidden;

        padding-top: 1.25rem;
    }

    @media (max-width: 1120px) {

        display: flex;
        flex-direction: column;
        align-items: center;

        div.breadcrumb,
        h1,
        div.img-slider-container, 
        div.buy-card-container, 
        div.description, 
        div.html-body  {
            width: 100%;
            max-width: 43.75rem;
            text-align: center;
        }

        div.buy-card-container {
            margin: 0.625rem 0;

            display: flex;
            justify-content: center;
        }

        div.buy-card {
            margin: 0;
        }
    }
`;

export const BuyedWithContainer = styled.div`

    h3 {
        color: ${props => props.theme.color2};
        font-size: 1.5rem;

        margin: 1rem 0;
    }

    .buyed-with-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0.3125rem;
    }

    @media (max-width: 1120px) {
        .buyed-with-grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (max-width: 800px) {
        .buyed-with-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 450px) {
        .buyed-with-grid {
            grid-template-columns: 1fr;
        }
    }
`;

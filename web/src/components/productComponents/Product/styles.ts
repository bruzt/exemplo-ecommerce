import styled from 'styled-components';

export const Container = styled.section`
    min-height: 800px;
    
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: 60px minmax(40px, auto) 425px auto 1fr;
    grid-template-areas: 
        "breadcrumb breadcrumb"
        "title title"
        "slider-container buy-card-container"
        "description buy-card-container"
        "html-body buy-card-container"
    ;

    div.breadcrumb {
        grid-area: breadcrumb;
        padding: 10px;
        background: #0D2235;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        margin-bottom: 20px;
        font-size: 18px;
    }

    div.breadcrumb a {
        cursor: pointer;
    }

    h1 {
        grid-area: title;
        text-align: center;
        margin-bottom: 20px;
    }

    div.img-slider-container,
    div.description,
    div.html-body {
        padding: 10px;
        background: ${props => props.theme.secondary};
    }

    div.img-slider-container {
        grid-area: slider-container;

        width: 100%;
        max-width: 700px;
    }

    .img-container {
        height: 400px;
        
        display: flex;
        justify-content: center;
    }

    .buy-card-container {
        grid-area: buy-card-container;
        height: 100%;
        display: flex;
        flex-direction: row;
        margin: 0;
        justify-content: space-between;
    }

    .buy-card {
        position: sticky;
        top: 5px;

        width: 100%;
        max-width: 400px;
        height: 400px;
        background: #0D2235;
        border-radius: 5px;
        padding: 10px;
        margin: 0 0 0 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .buy-card .price {
        font-size: 20px;
        font-weight: bold;
    }

    .buy-card .original-price {
        text-decoration: line-through;
    }

    .buy-card .total {
        font-size: 30px;
        font-weight: bold;
    }

    .buy-card .discount {
        background: #41773A;
        padding: 10px 20px;
    }

    .buy-card .lacking {
        background: #a32e39;
        padding: 10px 20px;
    }

    .buy-card input#qtd {
        width: 45px;
        height: 30px;
        font-size: 20px;
        border: 0;
        border-radius: 5px;
        padding: 3px;
    }

    .buy-card button {
        width: 100%;
        height: 50px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        color: inherit;
        background: #3E8C34;

        &:hover {
            background: #41A933;
        }

        &:active {
            background: #3E8C34;
        }

        &:disabled {
            background: #a32e39;
        }
    }

    .buy-card button p {
        margin: 5px 0 0 0;
    }

    .description {
        grid-area: description;
        padding: 10px 0;
        line-height: 25px;
    }

    div.html-body {
        grid-area: html-body;

        width: 100%;
        max-width: 700px;
        height: 100%;

        overflow-x: hidden;

        padding-top: 20px;
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
            max-width: 700px;
            text-align: center;
        }

        div.buy-card-container {
            margin: 10px 0;

            display: flex;
            justify-content: center;
        }
    }
`;

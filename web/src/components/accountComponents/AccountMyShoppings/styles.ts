import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 30px;
        margin-bottom: 20px;
    }

    div.scroll-x {
        width: 100%;
    }

    button[type='button'] {
        width: 100%;
        border: 0;
        color: inherit;
        background: #0D2235;
        padding: 10px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
    }

    button[type='button'].tab-open {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    button[type='button']:hover {
        background: #16324C;
    }

    button[type='button']:active {
        background: #0D2235;
    }

    div.card {
        width: 100%;
        margin-bottom: 20px;
    }

    div.card-header {
        width: 100%;
        font-size: 20px;

        display: grid;
        grid-template-columns: 100px 1fr 1fr 1fr;
    }

    .order-card {
        background: #0D2235;
        border-top: 1px solid #16324C;
        padding: 5px;
        cursor: pointer;

        display: grid;
        grid-template-columns: 100px 1fr 50px 150px;
        grid-gap: 10px;
    }

    .order-card:last-child {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .order-card:hover {
        background: #16324C;
    }

    .order-card.freight-card {
        display: flex;
        align-items: center;
        
        & > span:nth-child(1){
            width: 710px;

            text-align: center;
        }
    }

    .order-card.freight-card span {
        padding: 0;
    }


    div.img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    div.img-container img {
        width: auto;
        max-width: 100px;
        height: auto;
        max-height: 50px;
    }

    .order-card span {
        padding-top: 15px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
        justify-content: center;
        white-space: nowrap;
    }

    .order-card span.product-title {
        display: flex;
        justify-content: center;
        padding: 0;
    }

    .order-card span.product-title span:nth-child(1) {
        width: 100%;
    }

    .order-card span.product-discount {
        width: fit-content !important;
        background: ${props => props.theme.success};
        padding: 5px 10px;
    }

    a.boleto-link {
        padding: 5px;
        background: #EED202;
        border-radius: 5px;
        color: #0D2235;
        cursor: alias;
    }

    span.paid {
        padding: 5px;
        background: #3E8C34;
        border-radius: 5px;
        color: #0D2235;
    }

    span.dispatch {
        padding: 5px;
        background: #43a836;
        border-radius: 5px;
        color: #0D2235;
    }

    span.tracking-code {
        padding: 5px;
        background: #44c734;
        border-radius: 5px;
        color: #0D2235;
        font-size: 18px;
        cursor: copy;
    }

    span.tracking-code span.user-select {
        user-select: text;
    }
    
    span.refused {
        padding: 5px;
        background: #a32e39;
        border-radius: 5px;
        color: #0D2235;
    }

    @media (max-width: 768px) {

        div.scroll-x {
            max-width: 100vw;
            overflow-x: scroll;

            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE 10+ */
            
            &::-webkit-scrollbar {
                width: 0px;
                background: transparent; /* Chrome/Safari/Webkit */
            }
        }


        div.card {
            width: 1000px;
        }
    }
`;

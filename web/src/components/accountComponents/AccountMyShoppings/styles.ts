import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        margin-bottom: 50px;
    }

    div.scroll-x {
        width: 100%;
    }

    div.card button[type='button'] {
        width: 100%;
        border: 0;
        padding: 10px;
        color: ${props => props.theme.color};
        background: ${props => props.theme.primary};
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
        
        &.tab-open {
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        &:hover {
            background: ${props => props.theme.secondary};
        }

        &:active {
            background: ${props => props.theme.primary};
        }
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
        align-items: center;
    }

    .order-card {
        background: ${props => props.theme.primary};
        border-top: 1px solid ${props => props.theme.secondary};
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
        background: ${props => props.theme.secondary};
    }

    .order-card.freight-card {
        display: flex;
        align-items: center;
        cursor: default;

        &:hover {
            background: ${props => props.theme.primary};
        }
        
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
        background: ${props => props.theme.warning};
        border-radius: 5px;
        color: #111;
        cursor: alias;
    }

    span.paid {
        padding: 5px;
        background: ${props => props.theme.success};
        border-radius: 5px;
        color: ${props => props.theme.primary};
    }

    span.dispatch {
        padding: 5px;
        background: ${props => props.theme.success};
        border-radius: 5px;
        color: ${props => props.theme.primary};
    }

    span.tracking-code {
        padding: 5px;
        background: ${props => props.theme.successActive};
        border-radius: 5px;
        color: ${props => props.theme.primary};
        font-size: 18px;
        cursor: copy;
    }

    span.tracking-code span.user-select {
        user-select: text;
    }
    
    span.refused {
        padding: 5px;
        background: ${props => props.theme.danger};
        border-radius: 5px;
        color: ${props => props.theme.primary};
    }

    div.order-content {
        animation: open-tab 0.5s ease-out;
    }

    @keyframes open-tab {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
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

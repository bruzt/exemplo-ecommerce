import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 1.875rem;
        margin-bottom: 3.125rem;
        color: ${props => props.theme.color2};
    }

    div.order-card-container {
        width: 55rem;
    }

    div.card button[type='button'] {
        width: 100%;
        border: 0;
        padding: 0.625rem;
        color: ${props => props.theme.color};
        background: ${props => props.theme.primary};
        border-top-right-radius: 0.3125rem;
        border-top-left-radius: 0.3125rem;
        border-bottom-right-radius: 0.3125rem;
        border-bottom-left-radius: 0.3125rem;
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
        margin-bottom: 1.25rem;
    }

    div.card-header {
        width: 100%;
        font-size: 1.25rem;

        display: grid;
        grid-template-columns: 6.25rem 1fr 1fr 1fr;
        align-items: center;
    }

    .order-card-details {
        background: ${props => props.theme.primary};
        border-top: 1px solid ${props => props.theme.secondary};
        padding: 0.3125rem;
        cursor: pointer;

        display: grid;
        grid-template-columns: 6.25rem 1fr 3.125rem 9.375rem;
        grid-gap: 0.625rem;
    }

    .order-card-details:last-child {
        border-bottom-right-radius: 0.3125rem;
        border-bottom-left-radius: 0.3125rem;
    }

    .order-card-details:hover {
        background: ${props => props.theme.secondary};
    }

    .freight-card {
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background: ${props => props.theme.primary};

        cursor: default;

        padding: 0.5rem 5.8rem;
        
        /*& > span:nth-child(1){
            width: 70.625rem;

            text-align: center;
        }*/
    }

    .order-card-details.freight-card span {
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
        max-width: 6.25rem;
        height: auto;
        max-height: 3.125rem;
    }

    .order-card-details span {
        padding-top: 0.9375rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
        justify-content: center;
        white-space: nowrap;
    }

    .order-card-details span.product-title {
        display: flex;
        justify-content: center;
        padding: 0;
    }

    .order-card-details span.product-title span:nth-child(1) {
        width: 100%;
    }

    .order-card-details span.product-discount {
        width: fit-content !important;
        background: ${props => props.theme.success};
        padding: 0.3125rem 0.625rem;
    }

    span.processing {
        padding: 0.3125rem;
        background: ${props => props.theme.warningActive};
        border-radius: 0.3125rem;
        color: #111;
    }

    a.boleto-link {
        padding: 0.3125rem;
        background: ${props => props.theme.warning};
        border-radius: 0.3125rem;
        color: #111;
        cursor: alias;
    }

    span.paid {
        padding: 0.3125rem;
        background: ${props => props.theme.success};
        border-radius: 0.3125rem;
        color: ${props => props.theme.primary};
    }

    span.dispatch {
        padding: 0.3125rem;
        background: ${props => props.theme.success};
        border-radius: 0.3125rem;
        color: ${props => props.theme.primary};
    }

    span.tracking-code {
        padding: 0.3125rem;
        background: ${props => props.theme.successActive};
        border-radius: 0.3125rem;
        color: ${props => props.theme.primary};
        font-size: 1.125rem;
        cursor: copy;
    }

    span.tracking-code span.user-select {
        user-select: text;
    }
    
    span.refused {
        padding: 0.3125rem;
        background: ${props => props.theme.danger};
        border-radius: 0.3125rem;
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
            width: 62.5rem;
        }
    }
`;

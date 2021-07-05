import styled from 'styled-components';

export const Container = styled.section`
    
    min-height: calc(100vh - 25rem);

    h1 {
        text-align: center;
        margin-bottom: 1.5625rem;
    }

    h1.empty {
        margin-top: 3.125rem;
    }

    table {
        width: 100%;
        border-spacing: 0;  
    }

    .th-image {
        width: 10%;
    }

    .th-product {
        width: 45%;
    }

    .th-price, .th-qtd, .th-total  {
        width: 15%; 
    }

    thead tr {
        background: ${props => props.theme.primary};
        height: 3.125rem;
    }

    tbody tr {
        background: ${props => props.theme.secondary};

        &.out-of-stock {
            background: ${props => props.theme.danger};
        }
    }

    tbody tr + tr td {
        border-top: 1px solid ${props => props.theme.background};
    }

    .td-image img {
        width: 6.25rem;
        height: 3.125rem;
        vertical-align: middle;
        object-fit: cover;
    }

    .td-name .over-hidden {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .td-name a {
        display: flex;
        justify-content: space-between;
    }

    .td-name .order-discount {
        background: ${props => props.theme.success};
        max-height: 1.6875rem;
        padding: 0.3125rem 0.625rem;
        margin: 0 0 0 0.625rem;
    }

    .td-price {
        text-align: center;
    }

    .td-qtd .cart-qtd {
        font-weight: bold;
        font-size: 1.25rem;
    }

    .td-qtd span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .td-qtd span + span {
        margin: 0.3125rem 0 0 0;
    }

    .td-qtd button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 1.25rem; 
        height: 1.25rem;

        margin: 0 0.625rem;

        border: 1px solid #111;
        border-radius: 0.125rem;
        
        font-weight: bold;
        cursor: pointer;

        &:active {
            background: ${props => props.theme.success};
        }
    }

    .td-qtd button#remove {
        background: ${props => props.theme.danger};

        &:active {
            background: ${props => props.theme.dangerActive};
        }
    }

    .td-qtd input {
        width: 2.5rem;
    }

    .td-total {
        text-align: center;
        font-weight: bold;
    }

    .freight-total {
        display: flex;
        justify-content: flex-end;
    }

    .total-price {
        width: 18.75rem;
        font-size: 1.5625rem;
        font-weight: bold;
        margin-top: 1.25rem;
        background: ${props => props.theme.primary};
        padding: 1.25rem;

        display: flex;
        flex-direction: column;
    }

    .total-price span.total {
        font-size: 1.875rem;
    }

    .total-price button {
        width: 100%;
        height: 3.125rem;
        margin: 0.625rem 0 0 0;
        border: 0;
        border-radius: 0.3125rem;
        background: ${props => props.theme.success};
        font-size: 1.25rem;
        font-weight: bold;
        cursor: pointer;
        color: inherit;

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

    .total-price button.login {
        background: ${props => props.theme.warning};
        color: #111;

        transition: background-color .5s;

        &:hover {
            background: ${props => props.theme.warningActive};
        }

        &:active {
            background: ${props => props.theme.warning};
        }
    }

    .calc-freight {
        margin: 1.25rem 3.125rem 0 0;
    }

    .calc-freight .cep-input {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .calc-freight input {
        width: 9.375rem;
        height: 1.875rem;
        font-size: 1.5625rem;  
        padding: 0 0 0 0.125rem;  
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-top-left-radius: 0.3125rem;
        border-bottom-left-radius: 0.3125rem;
        text-align: center;
        background: #eee;
    }

    .calc-freight button {
        width: 1.875rem;
        height: 1.875rem;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-top-right-radius: 0.3125rem;
        border-bottom-right-radius: 0.3125rem;
        cursor: pointer;
        color: #111;
        background: #eee;
    }

    .calc-freight button:active {
        background: ${props => props.theme.success};
    }

    /* remove arrows from input[type="number"] Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* remove arrows from input[type="number"] Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    .choose-freight {
        margin: 0.625rem 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: ${props => props.theme.primary};
        padding: 0.3125rem;   
    }

    .choose-freight span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .choose-freight span input {
        margin-right: 0.625rem;
        width: 0.9375rem;
        cursor: pointer;
    }

    @media (max-width: 800px) {
        .th-image, .td-image, .th-total, .td-total {
            display: none;
        }

        .td-name {
            padding-left: 0.625rem;
        }
    }

    @media (max-width: 670px) {
        .freight-total {
            flex-direction: column;
            align-items: center;
        }

        .calc-freight {
            margin: 1.25rem 0 0 0;
        }
    }
`;

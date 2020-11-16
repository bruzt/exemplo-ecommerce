import styled from 'styled-components';

export const Container = styled.section`
    
    min-height: 800px;
    padding: 20px 0;

    h1 {
        text-align: center;
        margin: 25px 0;
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
        height: 50px;
    }

    tbody tr {
        background: ${props => props.theme.secondary};
    }

    tbody tr + tr td {
        border-top: 1px solid ${props => props.theme.background};
    }

    .td-image {
        text-align: center;
    }

    .td-image img {
        width: auto;
        height: 50px;
        vertical-align: middle;
        padding: 1px 0;
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
        max-height: 27px;
        padding: 5px 10px;
        margin: 0 0 0 10px;
    }

    .td-price {
        text-align: center;
    }

    .td-qtd .cart-qtd {
        font-weight: bold;
        font-size: 20px;
    }

    .td-qtd span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .td-qtd span + span {
        margin: 5px 0 0 0;
    }

    .td-qtd button {
        width: 20px; 
        height: 20px;
        margin: 0 10px;
        border: 0;
        border-radius: 2px;
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
        width: 40px;
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
        width: 300px;
        font-size: 25px;
        font-weight: bold;
        margin-top: 20px;
        background: ${props => props.theme.primary};
        padding: 20px;

        display: flex;
        flex-direction: column;
    }

    .total-price span.total {
        font-size: 30px;
    }

    .total-price button {
        width: 100%;
        height: 50px;
        margin: 10px 0 0 0;
        border: 0;
        border-radius: 5px;
        background: ${props => props.theme.success};
        font-size: 20px;
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
        margin: 20px 50px 0 0;
    }

    .calc-freight .cep-input {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .calc-freight input {
        width: 150px;
        height: 30px;
        font-size: 25px;  
        padding: 0 0 0 2px;  
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        text-align: center;
        background: #eee;
    }

    .calc-freight button {
        width: 30px;
        height: 30px;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
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
        margin: 10px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: ${props => props.theme.primary};
        padding: 5px;   
    }

    .choose-freight span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .choose-freight span input {
        margin-right: 10px;
        width: 15px;
        cursor: pointer;
    }

    @media (max-width: 800px) {
        .th-image, .td-image, .th-total, .td-total {
            display: none;
        }

        .td-name {
            padding-left: 10px;
        }
    }

    @media (max-width: 670px) {
        .freight-total {
            flex-direction: column;
            align-items: center;
        }

        .calc-freight {
            margin: 20px 0 0 0;
        }
    }
`;

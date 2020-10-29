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
        border-spacing: 0 5px;
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

    tbody tr {
        background: #0D2235;
    }

    .td-image {
        text-align: center;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
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
        background: #3E8C34;
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
    }

    .td-qtd button:active {
        background: #3E8C34;
    }

    .td-qtd button#remove {
        background: #a32e39;
    }
    
    .td-qtd button#remove:active { 
        background: #bf2232;
    }

    .td-qtd input {
        width: 40px;
    }

    .td-total {
        text-align: center;
        font-weight: bold;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .freight-total {
        display: flex;
        justify-content: flex-end;
    }

    .total-price {
        width: 300px;
        font-size: 25px;
        font-weight: bold;
        margin: 20px 30px 0 0;
        background: #0D2235;
        padding: 20px;
        border-radius: 5px;
    }

    .total-price p + p + p {
        font-size: 30px;
    }

    .total-price button {
        width: 100%;
        height: 50px;
        margin: 10px 0 0 0;
        border: 0;
        border-radius: 5px;
        background: #3E8C34;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        color: inherit;

        &:hover {
            background: #41A933;
        }

        &:active {
            background: #3E8C34;
        }
    }

    .total-price button.login {
        background: #EED202;
        color: #0D2235;

        &:hover {
            background: #f0dc4d;
        }

        &:active {
            background: #EED202;
        }
    }

    .total-price button:disabled {
        background: #a32e39;
        color: inherit;
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
        border: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        text-align: center;
        background: #eee;
    }

    .calc-freight button {
        width: 30px;
        height: 30px;
        border: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
        color: black;
        background: #eee;
    }

    .calc-freight button:active {
        background: #3E8C34;
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
        background: #0D2235;
        padding: 5px;
        border-radius: 5px;
    }

    .choose-freight span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .choose-freight span input {
        margin: 0 10px 0 0;
    }

    .choose-freight input {
        width: 20px;
    }

    @media (max-width: 800px) {
        .th-image, .td-image, .th-total, .td-total {
            display: none;
        }

        .td-name {
            padding-left: 10px;
        }
    }

    @media (max-width: 425px) {
        .freight-total {
            flex-direction: column;
            align-items: center;
        }
    }
`;

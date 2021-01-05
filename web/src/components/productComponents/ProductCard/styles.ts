import styled from 'styled-components';

export const Container = styled.div`

    position: relative;

    width: 100%;
    height: 450px;

    border: 3px solid ${props => props.theme.primary};
    border-radius: 5px;
    overflow: hidden;
    background: ${props => props.theme.primary};

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: background-color 500ms;

    &:hover {
        /*box-shadow: 3px 3px #16324C;*/
        background: transparent;
    }

    a, 
    div.product-info {
        height: 100%;

        display: flex;
        flex-direction: column;
    }

    span.discount {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 5;

        background: #41773A;
        padding: 10px 15px;
        font-size: 20px;
    }

    span.lacking {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 5;

        background: #a32e39;
        padding: 10px 15px;
        font-size: 20px;
    }

    figure.img-container {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;

        height: 200px;

        overflow: hidden;
    }

    figure.img-container img {
        width: 100%;
        /*max-width: 475px;*/
        height: 200px;
        object-fit: cover;
    }

    div.title-container {
        margin-top: 10px;
    }

    div.title-container span.title {
        font-size: 20px;
        text-align: center;
       
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    div.price-and-discount {
        /*margin-top: 10px;*/
        /*height: 1fr;*/

        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    div.price-and-discount span.price {
        font-size: 30px;
        font-weight: bold;
        padding: 5px 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    div.price-and-discount span.original-price {
        text-decoration: line-through;
    }

    button {
        cursor: pointer;
        height: 60px;
        border: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;

        background: ${props => props.theme.success};
        color: ${props => props.theme.color};

        font-size: 20px;

        transition: background-color .5s;

        &:hover {
            background: ${props => props.theme.successActive};
        }

        &:active {
            background: ${props => props.theme.success};
        }

        &:disabled {
            background: ${props => props.theme.danger};
            cursor: not-allowed;
        }
    }
`;

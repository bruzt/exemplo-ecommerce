import styled from 'styled-components';

export const Container = styled.div`

    position: relative;

    width: 100%;
    height: 28.125rem;

    border: 0.1875rem solid ${props => props.theme.primary};
    border-radius: 0.3125rem;
    overflow: hidden;
    background: ${props => props.theme.primary};

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: background-color 500ms;

    &:hover {
        /*box-shadow: 0.1875rem 0.1875rem #16324C;*/
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
        padding: 0.625rem 0.9375rem;
        font-size: 1.25rem;
    }

    span.lacking {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 5;

        background: #a32e39;
        padding: 0.625rem 0.9375rem;
        font-size: 1.25rem;
    }

    figure.img-container {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;

        height: 12.5rem;

        overflow: hidden;
    }

    figure.img-container img {
        width: 100%;
        /*max-width: 29.6875rem;*/
        height: 12.5rem;
        object-fit: cover;
    }

    div.title-container {
        margin-top: 0.625rem;
    }

    div.title-container span.title {
        font-size: 1.25rem;
        text-align: center;
       
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    div.price-and-discount {
        /*margin-top: 0.625rem;*/
        /*height: 1fr;*/

        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    div.price-and-discount span.price {
        font-size: 1.875rem;
        font-weight: bold;
        padding: 0.3125rem 0.625rem;

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
        height: 3.75rem;
        border: 0;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;

        background: ${props => props.theme.success};
        color: ${props => props.theme.color};

        font-size: 1.25rem;

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

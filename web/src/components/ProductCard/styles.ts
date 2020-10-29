import styled from 'styled-components';

export const Container = styled.div`

    .p-card {
        border-radius: 5px;
        max-height: 350px;
        overflow: hidden;
        padding: 10px;
        background: #0D2235;
    }

    .p-card:hover {
        box-shadow: 5px 5px #16324C;    
    }

    .p-card img {
        width: 100%;
        max-width: 475px;
        height: auto;
    }

    .p-card .title-price {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .p-card .title {
        font-size: 15px;
        margin-top: 10px;
        
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .p-card .price-discount {
        margin: 10px 0 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .p-card .price-discount .discount {
        background: #41773A;
        padding: 5px 10px;
    }

    .p-card .price-discount .lacking {
        background: #a32e39;
        padding: 5px 10px;
    }

    .p-card .price-discount .price {
        font-size: 30px;
        font-weight: bold;
        padding: 5px 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .p-card .price-discount .original-price {
        text-decoration: line-through;
    }

    .img-container {
        height: 200px;
    }

    .img-container img {
        width: auto;
        max-width: 325px;
        height: auto;
        max-height: 200px;
    }
`;

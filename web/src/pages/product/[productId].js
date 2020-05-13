import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export async function getStaticPaths(){

    const response = await api.get('/products');

    const paths = response.data.map( (data) => ({ params: { productId: data.id.toString() }}));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }){
    
    const response = await api.get(`/products/${params.productId}`);
    
    //const props = response.filter( (data) => data.id == params.itemId )[0];
    
    return {
        props: response.data
    }
}

export default function Product(props) {

    return (
        <>
            <Head>
                <title>{props.name}</title>
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.category.name} />
            </Head>

            <Header />

            <Container>

                {props.name}

            </Container>

            <Footer />
        </>
    );
}

const Container = styled.section`
    width: 100%;
    max-width: 1300px;
    min-height: 800px;
    border-right: 1px solid black;
    border-left: 1px solid black;
    margin: 0 auto;
`;

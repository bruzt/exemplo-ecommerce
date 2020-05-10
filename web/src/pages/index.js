import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styled from 'styled-components';

export default function Home() {

    const [productsState, setProducts] = useState([]);

    useEffect( () => {



    }, []);

    async function getProducts(){

        
    }

    return (
        <>
            <Head>
                <title>E-commerce</title>
                <meta name="description" content="Exemplo de e-coomerce, página inicial"/>
                <meta name="keywords" content="exemplo, e-commerce"/>
                <meta name="author" content="Bruno Zutim" />
            </Head>

            <Container>

            </Container>
        </>
    )
}

const Container = styled.div`

`;
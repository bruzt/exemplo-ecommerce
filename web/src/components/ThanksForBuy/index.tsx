import React from 'react';
import Head from 'next/head';

import { useOrder } from '../../contexts/orderContext';

import { Container } from './styles';

export default function ThanksForBuy() {
	
	const orderContext = useOrder();

    return (
        <>
            <Head>
                <title>Obrigado pela compra</title>
                <meta name="robots" content="noindex" />
            </Head>
            
            <Container>

                <h2>Obrigado pela compra, seu pedido será processado e qualquer alteração será informada por email</h2>
                <h2>Ordem de compra Nº {orderContext.getOrderId}</h2>
                {(orderContext.getBoletoUrl.length > 0) && (
                    <a 
                        href={orderContext.getBoletoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        ABRIR BOLETO
                    </a>
                )}

            </Container>
		</>
	);
}

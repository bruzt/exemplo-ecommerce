import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Head from 'next/head';

import { useOrder } from '../../../contexts/orderContext';

import { Container } from './styles';

import CreditCardPayment from '../CreditCardPayment';
import BoletoPayment from '../BoletoPayment';

export default function PaymentMethod() {
	
	const [getPaymentMethod, setPaymentMethod] = useState(null);

    const [getDisabledCreditCardButton, setDisabledCreditCardButton] = useState(false);
    const [getDisabledBoletoButton, setDisabledBoletoButton] = useState(false);

    const orderContext = useOrder();

    useEffect( () => {
        orderContext.setOrderId(null);
        orderContext.setBoletoUrl('');
    }, []);

    return (
        <>
            <Head>
                <title>Pagamento</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Container>

                <button
                    type='button'
                    className='back-button'
                    title='Voltar'
                    onClick={() => orderContext.setOrder('address')}
                >
                    <FaArrowLeft />
                </button>

                <h1>Método de pagamento</h1>

                <div className='cc-boleto-buttons'>
                    <button
                        type='button'
                        className={`cc-button ${(getPaymentMethod == 'cc') ? 'active' : ''}`}
                        disabled={getDisabledCreditCardButton}
                        onClick={() => setPaymentMethod('cc')}
                    >
                        Cartão de crédito
                    </button>

                    <button
                        type='button'
                        className={`boleto-button ${(getPaymentMethod == 'boleto') ? 'active' : ''}`}
                        disabled={getDisabledBoletoButton}
                        onClick={() => setPaymentMethod('boleto')}
                    >
                        Boleto
                    </button>
                </div>

                {(getPaymentMethod == 'cc') && (
                    <CreditCardPayment 
                        getDisabledBoletoButton={getDisabledBoletoButton}
                        setDisabledBoletoButton={setDisabledBoletoButton} 
                    />
                )}
                {(getPaymentMethod == 'boleto') && (
                    <BoletoPayment 
                        getDisabledCreditCardButton={getDisabledCreditCardButton}
                        setDisabledCreditCardButton={setDisabledCreditCardButton} 
                    />
                )}

            </Container>
		</>
	);
}

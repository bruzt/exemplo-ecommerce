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
        if(process.browser) window.scrollTo({ top: 0 });
        
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
                    data-testid='payment-method-back-button'
                    title='Voltar'
                    onClick={() => orderContext.setOrderFlowNumber(2)}
                >
                    <FaArrowLeft />
                </button>

                <h1>Método de pagamento</h1>

                <div className='cc-boleto-buttons'>
                    <button
                        type='button'
                        className={`cc-button ${(getPaymentMethod == 'cc') ? 'active' : ''}`}
                        disabled={getDisabledCreditCardButton}
                        data-testid='select-credit-card-button'
                        onClick={() => setPaymentMethod('cc')}
                    >
                        Cartão de crédito
                    </button>

                    <button
                        type='button'
                        className={`boleto-button ${(getPaymentMethod == 'boleto') ? 'active' : ''}`}
                        disabled={getDisabledBoletoButton}
                        data-testid='select-boleto-button'
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

import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Head from 'next/head';

import { useOrder } from '../context/orderContext';

import CreditCardPayment from './CreditCardPayment';
import BoletoPayment from './BoletoPayment';

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

            <section>

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

            </section>

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 20px 0;
                }

                h1 {
                    text-align: center;
                    margin: 20px;
                }
    
                .back-button {
                    border: 0;
                    background: transparent;
                    font-size: 30px;
                    cursor: pointer;
                    color: inherit;
                }

                .cc-boleto-buttons {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                .cc-boleto-buttons button {
                    font-size: 30px;
                    padding: 20px 30px;
                    margin: 10px;
                    border: 0;
                    border-radius: 5px;
                    color: #0D2235;
                    cursor: pointer;
                }

                .cc-boleto-buttons button:hover, .cc-boleto-buttons button.active {
                    background: #0D2235;
                    color: #eee;
                }
            `}</style>
        </>
    );
}
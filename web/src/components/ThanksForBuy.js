import React from 'react';

import { useOrder } from '../context/orderContext';

export default function ThanksForBuy() {

    const orderContext = useOrder();

    return (
        <>
            <section>

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

            </section>
           
            <style jsx>{`
                section {
                    padding: 20px 0;
                    min-height: 500px;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                section * {
                    margin: 20px 0;
                }

                h2 {
                    text-align: center;
                }

                a {
                    background: #0D2235;
                    color: #eee;
                    font-size: 20px;
                    padding: 10px 20px;
                    border-radius: 5px;
                }

                a:hover {
                    background: #16324C;
                }

                a:active {
                    background: #0D2235;
                }
            `}</style>
        </>
    );
}

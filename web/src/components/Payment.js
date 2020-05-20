import React from 'react';

import PageLayout from './PageLayout';

export default function Payment() {

    function handlePaySubmit(event){

        event.preventDefault();
    }

    return (
        <>
            <PageLayout>
                
                <section>

                    <h1>Cartão de Crédito</h1>

                    <form>
                        <div className='flex-column'>
                            <label htmlFor="card-holder-name">Nome impresso no cartão</label>
                            <input id='card-holder-name' type="text"/>
                        </div>
                        
                        <div className='flex-column'>
                            <label htmlFor="card-number">Numero do cartão</label>
                            <input id='card-number' type="text" maxLength={20} />
                        </div>

                        <div className='flex-row'>
                            <div className='flex-column'>
                                <label htmlFor="card-cvv">CVV</label>
                                <input id='card-cvv' type="text" maxLength={3} />
                            </div>

                            <div className='flex-column'>
                                <label htmlFor="card-expiration-date">Vencimento do cartão</label>
                                <input id='card-expiration-date' type="date"/>
                            </div>
                        </div>

                        <button 
                            type='submit'
                            onClick={(event) => handlePaySubmit(event)}
                        >
                            PAGAR
                        </button>
                    </form>

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 20px;
                }

                h1 {
                    text-align: center;
                    margin: 20px;
                }

                form {
                    padding: 20px 0 0 0;
                }

                .flex-column {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .flex-row {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                .flex-row div {
                    margin: 5px;
                }

                form div {
                    margin: 10px 0 0 0;
                }

                form input {
                    height: 40px;
                    border: 0;
                    border-radius: 5px;
                    padding: 3px;
                    font-size: 20px;
                }

                form input#card-holder-name {
                    text-align: center;
                }

                form input#card-number {
                    width: 210px;
                    text-align: center;
                }

                form input#card-cvv {
                    width: 50px;
                    text-align: center;
                }

                form input#card-expiration-date {
                    width: 190px;
                }

                form {
                    text-align: center;
                }

                form button {
                    width: 100px;
                    height: 50px;
                    margin: 20px 0 0 0;
                }
                
            `}</style>
        </>
    );
}

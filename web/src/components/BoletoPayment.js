import React, { useState, useEffect } from 'react';
import Loading from 'react-loader-spinner';

import api from '../services/api';

import { useCart } from '../context/cartContext';
import { useUser } from '../context/userContext';
import { useOrder } from '../context/orderContext';

export default function BoletoPayment({ getDisabledCreditCardButton, setDisabledCreditCardButton }) {

    const [getDisabledCreateBoletoButton, setDisabledCreateBoletoButton] = useState(true);

    const [getValidCpf, setValidCpf] = useState(true);

    const [getCpf, setCpf] = useState('');
    const [getPhone, setPhone] = useState('');

    const cartContext = useCart();
    const userContext = useUser();
    const orderContext = useOrder();

    useEffect( () => {

        if(
            getCpf.length == 14 &&
            getValidCpf &&
            getPhone.length > 14
        ) {

            setDisabledCreateBoletoButton(false);
        }

    }, [getCpf, getPhone])

    function handleCpf(value){

        const format = userContext.formatCpf(value);

        setValidCpf(format.valid);
        setCpf(format.cpf);
    }

    async function handleCreateBoleto() {

        setDisabledCreateBoletoButton(true);
        setDisabledCreditCardButton(true);

        const amount = Number(String(cartContext.getTotalPrice).replace('.', ''));
        const phone = getPhone.replace('(', '').replace(')', '').replace(' ', '').replace(/-/g, '');
        const cpf = getCpf.replace('.', '').replace('.', '').replace('-', '');
        const [address] = userContext.getUser.addresses.filter((address) => address.id == cartContext.getAddressId);

        const products_id = cartContext.getCart.map((product) => product.id);
        const quantity_buyed = cartContext.getCart.map((product) => product.qtd);

        let date = new Date();
        date.setDate(date.getDate() + 3);
        const boleto_expiration_date = `${date.getFullYear()}-${((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${(date.getDate() < 10) ? '0' + date.getDate() : date.getDate() }`;

        try {

            const response = await api.post('/orders', {
                products_id,
                quantity_buyed,
                address_id: address.id,
                freight_name: cartContext.getFreightSelected,
                freight_price: Number((cartContext.getFreightPrice[cartContext.getFreightSelected].Valor).replace(',', '.')),
                total_price: cartContext.getTotalPrice,
                boleto: {
                    amount,
                    payment_method: 'boleto',
                    boleto_expiration_date,
                    boleto_instructions: 'O BOLETO VENCE EM 3 (TRÊS) DIAS.',
                    capture: true,
                    customer: {
                        external_id: String(userContext.getUser.id),
                        name: userContext.getUser.name,
                        email: userContext.getUser.email,
                        type: "individual",
                        country: "br",
                        phone_numbers: ["+55" + phone],
                        documents: [
                            {
                                type: "cpf",
                                number: cpf
                            }
                        ]
                    },
                    shipping: {
                        name: userContext.getUser.name,
                        fee: Number((cartContext.getFreightPrice[cartContext.getFreightSelected].Valor).replace(',', '')),
                        address: {
                            street: address.street,
                            street_number: address.number,
                            neighborhood: address.neighborhood,
                            city: address.city,
                            state: address.state.toLowerCase(),
                            zipcode: address.zipcode.replace('-', ''),
                            country: "br",
                        }
                    }
                }
            });

            console.log(response.data)

            const user = { ...userContext.getUser };
            user.orders.push(response.data.order);
            userContext.setUser(user);

            cartContext.orderFinished();

            orderContext.setOrderId(response.data.order.id);
            orderContext.setBoletoUrl(response.data.pagarme.boleto_url);
            orderContext.setOrder('thanksForBuy');

        } catch (error) {
            console.log(error);
            alert('Erro, tente novamente');
            setDisabledCreateBoletoButton(false);
            setDisabledCreditCardButton(false);
        }
    }

    return (
        <>
            <h2>Boleto</h2>

            <div>
                <div className="button-total">

                    <div className='freight-total'>
                        <p>Subtotal: R$ {Number(cartContext.getSubtotalPrice).toFixed(2)}</p>
                        <p>Frete: R$ {Number((cartContext.getFreightPrice[cartContext.getFreightSelected].Valor).replace(',', '.')).toFixed(2)}</p>
                        <p>Total: R$ {Number(cartContext.getTotalPrice).toFixed(2)}</p>
                    </div>

                    <div className='inputs'>
                        <div className='input-group'>
                            <label htmlFor="cpf">CPF</label>
                            <input 
                                id='cpf' 
                                type="text" 
                                className={`${(getValidCpf) ? '' : 'invalid-cpf'}`}
                                maxLength={14}
                                value={getCpf}
                                onChange={(event) => handleCpf(event.target.value)}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor="phone">DDD + Telefone</label>
                            <input 
                                id='phone' 
                                type="text" 
                                maxLength={16}
                                value={getPhone}
                                onChange={(event) => setPhone(userContext.formatPhone(event.target.value))}
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={getDisabledCreateBoletoButton}
                        onClick={(event) => handleCreateBoleto(event)}
                    >
                        {(getDisabledCreditCardButton)
                            ? <Loading
                                type="TailSpin"
                                color='#0D2235'
                                height={30}
                                width={30}
                              />
                            : 'GERAR BOLETO'
                        }
                    </button>
                </div>
            </div>

            <style jsx>{`
                h2 {
                    text-align: center;
                    margin: 20px;
                }

                .button-total {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 20px;
                }

                .button-total .freight-total {
                    background: #0D2235;
                    border-radius: 5px;
                    padding: 10px;
                }

                .button-total .freight-total p + p + p {
                    font-size: 30px;
                    font-weight: bold;
                }

                .button-total .inputs {
                    display: flex;
                }

                .button-total .inputs .input-group {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .button-total .inputs .input-group input {
                    border: 0;
                    border-radius: 5px;
                    margin: 0 5px;
                    height: 40px;
                    padding: 5px;
                    font-size: 20px;
                    text-align: center;
                }

                .button-total .inputs .input-group input.invalid-cpf {
                    border: 2px solid red;
                }

                .button-total button {
                    border: 0;
                    border-radius: 5px;
                    width: 200px;
                    height: 75px;
                    background: #3E8C34;
                    font-size: 20px;
                    font-weight: bold;
                    color: inherit;
                }

                .button-total button:hover {
                    background: #41A933;
                }

                .button-total button:active {
                    background: #3E8C34;
                }

                .button-total button:disabled {
                    background: ${(getDisabledCreditCardButton) ? '#3E8C34' : '#a32e39'};
                    color: inherit;
                }
            `}</style>
        </>
    );
}
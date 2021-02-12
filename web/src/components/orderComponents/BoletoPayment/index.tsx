import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../../services/api';
import formatCpf from '../../../utils/formatCpf';
import formatPhone from '../../../utils/formatPhone';

import { Container, LoadingSpinner } from './styles';

import { useCart } from '../../../contexts/cartContext';
import { useUser } from '../../../contexts/userContext';
import { useOrder } from '../../../contexts/orderContext';

interface IProps {
    getDisabledCreditCardButton: boolean;
    setDisabledCreditCardButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoletoPayment({ getDisabledCreditCardButton, setDisabledCreditCardButton }: IProps) {

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
            getPhone.length > 13
        ) {

            setDisabledCreateBoletoButton(false);
        } else setDisabledCreateBoletoButton(true);

    }, [getCpf, getPhone])

    function handleCpf(value){

        const format = formatCpf(value);

        setValidCpf(format.valid);
        setCpf(format.cpf);
    }

    async function handleCreateBoleto(event: FormEvent) {

        event.preventDefault();

        setDisabledCreateBoletoButton(true);
        setDisabledCreditCardButton(true);

        const phone = getPhone.replace('(', '').replace(')', '').replace(' ', '').replace(/-/g, '');
        const cpf = getCpf.replace('.', '').replace('.', '').replace('-', '');
        const [address] = userContext.getUser.addresses.filter((address) => address.id == cartContext.getAddressId);

        const products_id = cartContext.getCart.map((product) => product.id);
        const quantity_buyed = cartContext.getCart.map((product) => product.qtd);

        try {

            const response = await api.post('/orders', {
                products_id,
                quantity_buyed,
                address_id: address.id,
                freight_name: cartContext.getFreightSelected,
                freight_price: Number((cartContext.getFreightPrice[cartContext.getFreightSelected].Valor).replace(',', '.')),
                boleto: {
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

            cartContext.orderFinished();

            orderContext.setOrderId(response.data.order.id);
            orderContext.setBoletoUrl(response.data.pagarme.boleto_url);
            orderContext.setOrderFlowNumber(4);

        } catch (error) {
            console.log(error);
            alert('Erro, tente novamente');
            setDisabledCreateBoletoButton(false);
            setDisabledCreditCardButton(false);
        }
    }

    return (
        <Container>
            <h2>Boleto</h2>

            <form 
                className="boleto-form"
                onSubmit={handleCreateBoleto}
            >

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
                            onChange={(event) => setPhone(formatPhone(event.target.value))}
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={getDisabledCreateBoletoButton}
                >
                    {(getDisabledCreditCardButton)
                        ? <LoadingSpinner />
                        : 'GERAR BOLETO'
                    }
                </button>
            </form>
        </Container>
    );
}

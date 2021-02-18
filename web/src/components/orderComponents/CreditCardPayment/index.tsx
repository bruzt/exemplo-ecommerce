import React, { useState, useEffect, FormEvent } from 'react';
import Loading from 'react-loader-spinner';

import api from '../../../services/api';
import formatCpf from '../../../utils/formatCpf';
import formatPhone from '../../../utils/formatPhone';
import formatZipCode from '../../../utils/formatZipCode';

import { Container } from './styles';

import { useUser } from '../../../contexts/userContext';
import { useCart } from '../../../contexts/cartContext';
import { useOrder } from '../../../contexts/orderContext';

interface IProps {
    getDisabledBoletoButton: boolean;
    setDisabledBoletoButton: React.Dispatch<boolean>;
}

export default function CreditCardPayment({ getDisabledBoletoButton, setDisabledBoletoButton }: IProps) {
    
    const [getCardHolderName, setCardHolderName] = useState('');
    const [getCardNumber, setCardNumber] = useState('');
    const [getCardCvv, setCardCvv] = useState('');
    const [getCardExpirationMonth, setCardExpirationMonth] = useState('');
    const [getCardExpirationYear, setCardExpirationYear] = useState('');
    const [getInstallments, setInstallments] = useState(1);

    const [getPhone, setPhone] = useState('');
    const [getCpf, setCpf] = useState('');
    const [getValidCpf, setValidCpf] = useState(true);

    const [getStreet, setStreet] = useState('');
    const [getNumber, setNumber] = useState('');
    const [getNeighborhood, setNeighborhood] = useState('');
    const [getCity, setCity] = useState('');
    const [getState, setState] = useState('');
    const [getZipCode, setZipCode] = useState('');

    const [getDisabledPayButton, setDisabledPayButton] = useState(true);

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    useEffect(() => {

        if (
            getCardHolderName.length < 3 ||
            getCardNumber.length < 19 ||
            getCardCvv.length < 3 ||
            getCardExpirationMonth.length < 1 ||
            getCardExpirationYear.length < 1 ||
            getPhone.length < 14 ||
            getCpf.length < 14 ||
            !getValidCpf ||
            getStreet.length < 3 ||
            getNumber.length < 1 ||
            getNeighborhood.length < 3 ||
            getCity.length < 3 ||
            getState.length < 1 ||
            getZipCode.length < 9
        ) {

            setDisabledPayButton(true);

        } else {

            const year = String(new Date().getFullYear()).substr(-2);
            const month = new Date().getMonth() + 1;

            if (
                year == getCardExpirationYear &&
                month > Number(getCardExpirationMonth)
            ) {
                setDisabledPayButton(true);

            } else {

                setDisabledPayButton(false);
            }
        }

    }, [
        getCardHolderName,
        getCardNumber,
        getCardCvv,
        getCardExpirationMonth,
        getCardExpirationYear,
        getPhone,
        getCpf,
        getStreet,
        getNumber,
        getNeighborhood,
        getCity,
        getState,
        getZipCode
    ]);

    function handleCardNumber(value: string | number) {

        let cardNumber = String(value);

        cardNumber = cardNumber.replace(/[^0-9]/g, "");

        if (cardNumber.length == 16) {

            const part1 = cardNumber.slice(0, 4);
            const part2 = cardNumber.slice(4, 8);
            const part3 = cardNumber.slice(8, 12);
            const part4 = cardNumber.slice(12, 16);

            cardNumber = `${part1} ${part2} ${part3} ${part4}`;
        }

        setCardNumber(cardNumber);
    }

    function handleCardCvv(value: string | number) {

        let cardCvv = String(value);

        cardCvv = cardCvv.replace(/[^0-9]/g, "");

        setCardCvv(cardCvv);
    }

    function handleCpf(value: string | number) {

        const format = formatCpf(value);

        setValidCpf(format.valid);
        setCpf(format.cpf);
    }

    function handleSameAddressButton() {

        const [address] = userContext.getUser.addresses.filter((address) => address.id == cartContext.getAddressId);

        setStreet(address.street);
        setNumber(address.number);
        setNeighborhood(address.neighborhood);
        setCity(address.city);
        setState(address.state);
        setZipCode(address.zipcode);
    }

    async function handlePaySubmit(event: FormEvent) {

        event.preventDefault();

        setDisabledPayButton(true);
        setDisabledBoletoButton(true);

        const card_expiration_date = String(getCardExpirationMonth) + String(getCardExpirationYear);
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
                credit_card: {
                    installments: Number(getInstallments),
                    card_number: String(getCardNumber).replace(/ /g, ''),
                    card_cvv: getCardCvv,
                    card_expiration_date,
                    card_holder_name: getCardHolderName,
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
                    billing: {
                        name: getCardHolderName,
                        address: {
                            street: getStreet,
                            street_number: getNumber,
                            neighborhood: getNeighborhood,
                            city: getCity,
                            state: getState.toLowerCase(),
                            zipcode: getZipCode.replace('-', ''),
                            country: "br",
                        }
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

            orderContext.setOrderId(response.data.order.id);
            orderContext.setOrderFlowNumber(4);
            
            cartContext.cleanCart();

        } catch (error) {
            console.error(error);
            alert(error);
            setDisabledPayButton(false);
            setDisabledBoletoButton(false);
        }
    }

    return (
        <Container>
            <h2>Cartão de Crédito</h2>

            <form onSubmit={handlePaySubmit}>
                <div className="grid-columns">

                    <div className='cc-form'>
                        <div className='flex-column'>
                            <label htmlFor="card-holder-name" className='holder-name-label'>Nome impresso no cartão</label>
                            <input
                                id='card-holder-name'
                                type="text"
                                value={getCardHolderName}
                                onChange={(event) => setCardHolderName(event.target.value)}
                            />
                        </div>

                        <div className='flex-row justify-center'>
                            <div className='flex-column'>
                                <label htmlFor="card-number">Numero do cartão</label>
                                <input
                                    id='card-number'
                                    type="text"
                                    maxLength={19}
                                    value={getCardNumber}
                                    onChange={(event) => handleCardNumber(event.target.value)}
                                />
                            </div>

                        </div>

                        <div className='flex-row justify-center'>
                            <div className='flex-column'>
                                <label htmlFor="card-cvv">CVV</label>
                                <input
                                    id='card-cvv'
                                    type="text"
                                    maxLength={3}
                                    value={getCardCvv}
                                    onChange={(event) => handleCardCvv(event.target.value)}
                                />
                            </div>

                            <div className='flex-column'>
                                <label htmlFor="card-expiration-month">Vencimento</label>
                                <div className='flex-row-2'>
                                    <select
                                        id="card-expiration-month"
                                        value={getCardExpirationMonth}
                                        placeholder='Mês'
                                        onChange={(event) => setCardExpirationMonth(event.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <p>/</p>
                                    <select
                                        id="card-expiration-year"
                                        value={getCardExpirationYear}
                                        placeholder='Ano'
                                        onChange={(event) => setCardExpirationYear(event.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className='flex-row justify-center'>
                            <div className='flex-column'>
                                <label htmlFor="tel">DDD + Telefone</label>
                                <input
                                    type="text"
                                    id='tel'
                                    maxLength={16}
                                    value={getPhone}
                                    onChange={(event) => setPhone(formatPhone(event.target.value))}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor="cpf">CPF</label>
                                <input
                                    id='cpf'
                                    type="text"
                                    className={`${(getValidCpf) ? '' : 'invalid-value'}`}
                                    maxLength={14}
                                    value={getCpf}
                                    onChange={(event) => handleCpf(event.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='cc-form'>
                        <h2>Endereço de cobrança do cartão</h2>

                        <div className='flex-column'>
                            <label htmlFor="street">Logradouro</label>
                            <input
                                id='street'
                                type="text"
                                value={getStreet}
                                onChange={(event) => setStreet(event.target.value)}
                            />
                        </div>

                        <div className='flex-row flex-justify-start'>
                            <div className='flex-column'>
                                <label htmlFor="number"> Nº</label>
                                <input
                                    id='number'
                                    type="text"
                                    value={getNumber}
                                    onChange={(event) => setNumber(event.target.value)}
                                />
                            </div>
                            <div className='flex-column w-100'>
                                <label htmlFor="neighborhood">Bairro</label>
                                <input
                                    id='neighborhood'
                                    type="text"
                                    value={getNeighborhood}
                                    onChange={(event) => setNeighborhood(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='flex-row'>
                            <div className='flex-column'>
                                <label htmlFor="city">Cidade</label>
                                <input
                                    id='city'
                                    type="text"
                                    value={getCity}
                                    onChange={(event) => setCity(event.target.value)}
                                />
                            </div>

                            <div className='flex-column'>
                                <label htmlFor="state"> Estado</label>
                                <select
                                    id="state"
                                    value={getState}
                                    onChange={(event) => setState(event.target.value)}
                                >
                                    <option value=""></option>
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>

                            <div className='flex-column'>
                                <label htmlFor="zipcode">CEP </label>
                                <input
                                    id='zipcode'
                                    type="text"
                                    maxLength={9}
                                    value={getZipCode}
                                    onChange={(event) => setZipCode(formatZipCode(event.target.value))}
                                />
                            </div>
                        </div>
                        <div className='flex-row same-addr-button'>
                            <button
                                type='button'
                                onClick={handleSameAddressButton}
                            >
                                Mesmo da entrega
                                </button>
                        </div>
                    </div>
                </div>

                <div className="button-total">

                    <div className='freight-total'>
                        <p>Subtotal: R$ {Number(cartContext.getSubtotalPrice).toFixed(2)}</p>
                        <p>Frete: R$ {Number((cartContext.getFreightPrice[cartContext.getFreightSelected].Valor).replace(',', '.')).toFixed(2)}</p>
                        <p>Total: R$ {Number(cartContext.getTotalPrice).toFixed(2)}</p>
                    </div>

                    <select
                        id='installments'
                        onChange={(event) => setInstallments(Number(event.target.value))}
                    >
                        <option value={1}>1x de R$ {Number(cartContext.getTotalPrice).toFixed(2)}</option>
                        <option value={2}>2x de R$ {Number(cartContext.getTotalPrice / 2).toFixed(2)} (sem juros)</option>
                        <option value={3}>3x de R$ {Number(cartContext.getTotalPrice / 3).toFixed(2)} (sem juros)</option>
                        <option value={4}>4x de R$ {Number(cartContext.getTotalPrice / 4).toFixed(2)} (sem juros)</option>
                        <option value={5}>5x de R$ {Number(cartContext.getTotalPrice / 5).toFixed(2)} (sem juros)</option>
                        <option value={6}>6x de R$ {Number(cartContext.getTotalPrice / 6).toFixed(2)} (sem juros)</option>
                    </select>

                    <button
                        type='submit'
                        disabled={getDisabledPayButton}
                    >
                        {(getDisabledBoletoButton) 
                            ? <Loading
                                type="TailSpin"
                                color='#0D2235'
                                height={30}
                                width={30}
                              />
                            : 'PAGAR'
                        }
                        </button>
                </div>

            </form>
        </Container>
    );
}

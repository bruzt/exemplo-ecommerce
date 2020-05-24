import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';

import api from '../services/api';
import validateCpf from '../utils/validateCpf';

import { useUser } from '../context/userContext';
import { useCart } from '../context/cartContext';
import { useOrder } from '../context/orderContext';

import PageLayout from './PageLayout';

export default function Payment() {

    const [getCardHolderName, setCardHolderName] = useState('');
    const [getCardNumber, setCardNumber] = useState('');
    const [getCardCvv, setCardCvv] = useState('');
    const [getCardExpirationMonth, setCardExpirationMonth] = useState('');
    const [getCardExpirationYear, setCardExpirationYear] = useState('');
    const [getInstallments, setInstallments] = useState(1);

    const [getTel, setTel] = useState('');
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

    useEffect( () => {

        if(
            getCardHolderName.length < 3 ||
            getCardNumber.length < 19 ||
            getCardCvv.length < 3 ||
            getCardExpirationMonth.length < 1 ||
            getCardExpirationYear.length < 1 ||
            getTel.length < 14   ||
            getCpf.length < 14 ||
            !getValidCpf ||
            getStreet.length < 3 ||          
            getNumber.length < 1 ||          
            getNeighborhood.length < 3 ||  
            getCity.length < 3 ||  
            getState.length < 1 ||  
            getZipCode.length < 9
        ){

            setDisabledPayButton(true);

        }else {

            const year = String(new Date().getFullYear()).substr(-2);
            const month = new Date().getMonth() + 1;

            if(
                year == getCardExpirationYear &&
                month > getCardExpirationMonth
            ){
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
        getTel, 
        getCpf,
        getStreet, 
        getNumber,
        getNeighborhood,
        getCity,
        getState,
        getZipCode
    ]);

    useEffect(() => {

        if (getCardNumber.length > 0) {

            let cardNumber = String(getCardNumber);

            if (cardNumber.length < 17) cardNumber = cardNumber.replace(/[^0-9]/g, "");

            if (cardNumber.length == 16) {

                const part1 = cardNumber.slice(0, 4);
                const part2 = cardNumber.slice(4, 8);
                const part3 = cardNumber.slice(8, 12);
                const part4 = cardNumber.slice(12, 16);

                cardNumber = `${part1} ${part2} ${part3} ${part4}`;
            }

            setCardNumber(cardNumber);
        }

    }, [getCardNumber]);

    useEffect(() => {

        if (isNaN(getCardExpirationMonth)) setCardExpirationMonth('');
        if (isNaN(getCardExpirationYear)) setCardExpirationYear('');
        if (isNaN(getCardCvv)) setCardCvv('');

    }, [getCardExpirationMonth, getCardExpirationYear, getCardCvv]);

    useEffect(() => {

        if (getZipCode.length > 0) {

            let cepInput = String(getZipCode);

            if (cepInput.length < 9) cepInput = cepInput.replace(/[^0-9]/g, "");

            if (cepInput.length == 8) {

                const part1 = cepInput.slice(0, 5);
                const part2 = cepInput.slice(5, 8);

                cepInput = `${part1}-${part2}`;
            }

            setZipCode(cepInput);
        }

    }, [getZipCode]);

    function handleCpf(value) {

        if (value.length < 12) value = value.replace(/[^0-9]/g, "");

        if (value.length == 11) {

            const part1 = value.slice(0, 3);
            const part2 = value.slice(3, 6);
            const part3 = value.slice(6, 9);
            const part4 = value.slice(9, 11);

            value = `${part1}.${part2}.${part3}-${part4}`;
        }

        setValidCpf(validateCpf(value));

        setCpf(value);
    }

    function handleTel(value) {

        value = value.replace(/[^0-9]/g, "");

        if (value.length == 10) {

            const part1 = value.slice(0, 2);
            const part2 = value.slice(2, 6);
            const part3 = value.slice(6, 10);

            value = `(${part1}) ${part2}-${part3}`;
        }

        if (value.length == 11) {

            const part1 = value.slice(0, 2);
            const part2 = value.slice(2, 3);
            const part3 = value.slice(3, 7);
            const part4 = value.slice(7, 11);

            value = `(${part1}) ${part2}-${part3}-${part4}`;
        }

        setTel(value);
    }

    async function handlePaySubmit(event) {

        event.preventDefault();

        const amount = Number(String(cartContext.totalPriceState).replace('.', '')).toFixed(2);
        const card_expiration_date = String(getCardExpirationMonth) + String(getCardExpirationYear);
        const telephone = getTel.replace('(', '').replace(')', '').replace(' ', '').replace(/-/g, '');
        const cpf = getCpf.replace('.', '').replace('.', '').replace('-', '');
        const [address] = userContext.userData.addresses.filter((address) => address.id == cartContext.addressIdState);

        const products_id = cartContext.cart.map( (product) => product.id);
        const quantity_buyed = cartContext.cart.map( (product) => product.qtd);

        try {

            const respose = await api.post('/orders', {
                products_id,
                quantity_buyed,
                address_id: address.id,
                total_price: cartContext.totalPriceState,
                credit_card: {
                    amount,
                    installments: Number(getInstallments),
                    card_number: String(getCardNumber).replace(/ /g,''),
                    card_cvv: getCardCvv,
                    card_expiration_date,
                    card_holder_name: getCardHolderName,
                    customer: {
                        external_id: String(userContext.userData.id),
                        name: userContext.userData.name,
                        email: userContext.userData.email,
                        type: "individual",
                        country: "br",
                        phone_numbers: ["+55" + telephone],
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
                        name: userContext.userData.name,
                        fee: Number((cartContext.freightPriceState[cartContext.freightSelectedState].Valor).replace(',', '')),
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

            console.log(respose.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Head>
                <title>Pagamento</title>
                <meta name="robots" content="noindex" />
            </Head>
            <PageLayout>

                <section>

                    <button
                        type='button'
                        className='back-button'
                        title='Voltar'
                        onClick={() => orderContext.setOrder('address')}
                    >
                        <FaArrowLeft />
                    </button>

                    <h1>Cartão de Crédito</h1>

                    <form>
                        <div className="grid-columns">

                            <div className='border'>
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
                                            onChange={(event) => setCardNumber(event.target.value)}
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
                                            onChange={(event) => setCardCvv(event.target.value)}
                                        />
                                    </div>

                                    <div className='flex-column'>
                                        <label htmlFor="card-expiration-month">Vencimento</label>
                                        <div className='flex-row'>
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
                                    <div>
                                        <label htmlFor="tel">DDD + Telefone</label>
                                        <input
                                            type="text"
                                            id='tel'
                                            maxLength={16}
                                            value={getTel}
                                            onChange={(event) => handleTel(event.target.value)}
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
                            <div className='border'>
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
                                            onChange={(event) => setZipCode(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="button-total">

                            <div>
                                <p>Frete: R$ {Number((cartContext.freightPriceState[cartContext.freightSelectedState].Valor).replace(',', '.')).toFixed(2)}</p>
                                <p>Total: R$ {Number(cartContext.totalPriceState).toFixed(2)}</p>
                            </div>

                            <div>
                                <select
                                    id='installments'
                                    onChange={(event) => setInstallments(event.target.value)}
                                >
                                    <option value={1}>1x de R$ {Number(cartContext.totalPriceState).toFixed(2)}</option>
                                    <option value={2}>2x de R$ {Number(cartContext.totalPriceState/2).toFixed(2)} (sem juros)</option>
                                    <option value={3}>3x de R$ {Number(cartContext.totalPriceState/3).toFixed(2)} (sem juros)</option>
                                    <option value={4}>4x de R$ {Number(cartContext.totalPriceState/4).toFixed(2)} (sem juros)</option>
                                    <option value={5}>5x de R$ {Number(cartContext.totalPriceState/5).toFixed(2)} (sem juros)</option>
                                    <option value={6}>6x de R$ {Number(cartContext.totalPriceState/6).toFixed(2)} (sem juros)</option>
                                </select>
                            </div>

                            <button
                                type='submit'
                                disabled={getDisabledPayButton}
                                onClick={(event) => handlePaySubmit(event)}
                            >
                                PAGAR
                            </button>
                        </div>

                    </form>

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 20px;
                }

                .back-button {
                    border: 0;
                    background: transparent;
                    font-size: 30px;
                    cursor: pointer;
                }

                .border {
                    background: #c9c9c9;
                    border-radius: 5px;
                    padding: 10px;
                }

                h1 {
                    text-align: center;
                    margin: 20px;
                }

                form {
                    padding: 20px 0 0 0;
                }

                form .grid-columns {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    text-align: center;
                    grid-gap: 5px;
                }

                .flex-column {
                    display: flex;
                    flex-direction: column;
                }

                .flex-row {
                    display: flex;
                    flex-direction: row;
                   
                }

                .flex-row div {
                    margin: 0 5px;
                }

                .flex-row p {
                    font-size: 30px;
                    align-self: center;
                }

                .w-100 {
                    width: 100%;
                }

                form div {
                    margin: 10px 0 0 0;
                }

                form input, select {
                    height: 40px;
                    border: 0;
                    border-radius: 5px;
                    padding: 3px;
                    font-size: 20px;
                }

                .justify-center {
                    justify-content: center;
                }

                form .holder-name-label {
                    margin: 28px 0 0 0;
                }

                form input#card-holder-name {
                    text-align: center;
                }

                form input#card-number {
                    width: 210px;
                    text-align: center;
                    align-self: center;
                }

                form input#cpf {
                    width: 210px;
                    text-align: center;
                }

                #cpf.invalid-value {
                    border: 2px solid #a32e39;
                }

                form input#tel {
                    width: 210px;
                    text-align: center;
                }

                form input#card-cvv {
                    width: 50px;
                    text-align: center;
                }

                form input#card-expiration-month {
                    width: 50px;
                    text-align: center;
                }

                form input#card-expiration-year {
                    width: 50px;
                    text-align: center;
                }

                form button {
                    width: 100px;
                    height: 50px;
                    margin: 20px 0 0 0;
                }

                form #street {
                    width: 100%;
                }

                form #number {
                    width: 150px;
                    
                }

                form #neighborhood {
                    width: 100%;
                }

                form #city {
                    width: 100%;
                }

                form #state {
                    width: 100%;
                    min-width: 65px;   
                    background: #fff;
                }

                form #zipcode {
                    width: 150px;
                    text-align: center;
                }                

                .button-total {
                    display: flex;
                    justify-content: space-between;
                    font-size: 20px;
                }

                .button-total p + p {
                    font-size: 30px;
                    font-weight: bold;
                }

                .button-total button {
                    border: 0;
                    border-radius: 5px;
                    width: 200px;
                    height: 75px;
                    background: #3E8C34;
                    font-size: 20px;
                    font-weight: bold;
                }

                .button-total button:hover {
                    background: #41A933;
                }

                .button-total button:active {
                    background: #3E8C34;
                }

                .button-total button:disabled {
                    background: #a32e39;
                    color: inherit;
                }
            `}</style>
        </>
    );
}

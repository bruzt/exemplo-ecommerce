import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { useUser } from '../context/userContext';
import { useCart } from '../context/cartContext';

import PageLayout from './PageLayout';

export default function Payment() {

    const [getCardNumber, setCardNumber] = useState('');
    const [getCardCvv, setCardCvv] = useState('');
    const [getCardExpirationMonth, setCardExpirationMonth] = useState('');
    const [getCardExpirationYear, setCardExpirationYear] = useState('');

    const [getCpf, setCpf] = useState('');
    const [getTel, setTel] = useState('');

    const [getZipCode, setZipCode] = useState('');

    const [getFreightFinalPrice, setFreightFinalPrice] = useState(null);

    const userContext = useUser();
    const cartContext = useCart();

    useEffect(() => {

        verifyFreight();

    }, []);

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

    function handlePaySubmit(event) {

        event.preventDefault();
    }

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

    function verifyFreight() {

        const [address] = userContext.userData.addresses.filter((address) => address.id == cartContext.addressIdState);

        if (address.zipcode.replace('-', '') == cartContext.cepInputState.replace('-', '')) {

            const price = Number((cartContext.freightPriceState[cartContext.freightSelectedState].Valor).replace(',', '.')).toFixed(2);

            setFreightFinalPrice(price);

        } else {
            console.log('aaaaaaaaaaaaaa')
        }
    }

    function handleCpf(value) {

        if (value.length < 12) value = value.replace(/[^0-9]/g, "");

        if (value.length == 11) {

            const part1 = value.slice(0, 3);
            const part2 = value.slice(3, 6);
            const part3 = value.slice(6, 9);
            const part4 = value.slice(9, 11);

            value = `${part1}.${part2}.${part3}-${part4}`;
        }

        setCpf(value);
        validateCpf(value);
    }

    function validateCpf(cpf) {

        if (cpf.length == 14) {

            if (
                cpf == "000.000.000-00" ||
                cpf == "111.111.111-11" ||
                cpf == "222.222.222-22" ||
                cpf == "333.333.333-33" ||
                cpf == "444.444.444-44" ||
                cpf == "555.555.555-55" ||
                cpf == "666.666.666-66" ||
                cpf == "777.777.777-77" ||
                cpf == "888.888.888-88" ||
                cpf == "999.999.999-99"
            ){
                console.log('CPF não valido'); 

                return false;
            }

            cpf = cpf.replace('.', '').replace('.', '').replace('-', '');
            
            let soma = 0;
            let i = 0;
            let j = 10;

            while(i < 9){
                while(j > 1){

                    soma += Number(cpf[i]) * j;

                    i++;
                    j--;
                    break;
                }
            }

            const first = (soma*10)%11;

            if(first != cpf[9]){

                console.log('Primeiro digito não valido'); 

                return false;
            }

            soma = 0;
            i = 0;
            j = 11;

            while(i < 10){
                while(j > 1){

                    soma += Number(cpf[i]) * j;

                    i++;
                    j--;
                    break;
                }
            }

            const second = (soma*10)%11;

            if(second != cpf[10]){

                console.log('Segundo digito não valido'); 

                return false;
            }

            console.log(first, second);

            return true;
        }
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

    return (
        <>
            <Head>
                <title>Pagamento</title>
                <meta name="robots" content="noindex" />
            </Head>
            <PageLayout>

                <section>

                    <h1>Cartão de Crédito</h1>

                    <form>
                        <div className="grid-columns">

                            <div className='border'>
                                <div className='flex-column'>
                                    <label htmlFor="card-holder-name" className='holder-name-label'>Nome impresso no cartão</label>
                                    <input id='card-holder-name' type="text" />
                                </div>

                                <div className='flex-row justify-center'>
                                    <div className='flex-column'>
                                        <label htmlFor="card-number">Numero do cartão</label>
                                        <input
                                            id='card-number'
                                            type="text"
                                            maxLength={16}
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
                                                <option value="30">30</option>
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
                                            /*maxLength={15}*/
                                            value={getTel}
                                            onChange={(event) => handleTel(event.target.value)}
                                        />
                                    </div>
                                    <div className='flex-column'>
                                        <label htmlFor="cpf">CPF</label>
                                        <input
                                            id='cpf'
                                            type="text"
                                            /*maxLength={11} */
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
                                    <input id='street' type="text" />
                                </div>

                                <div className='flex-row flex-justify-start'>
                                    <div className='flex-column'>
                                        <label htmlFor="number"> Nº</label>
                                        <input id='number' type="text" />
                                    </div>
                                    <div className='flex-column w-100   '>
                                        <label htmlFor="neighborhood">Bairro</label>
                                        <input id='neighborhood' type="text" />
                                    </div>
                                </div>

                                <div className='flex-row'>
                                    <div className='flex-column'>
                                        <label htmlFor="city">Cidade</label>
                                        <input id='city' type="text" />
                                    </div>

                                    <div className='flex-column'>
                                        <label htmlFor="state"> Estado</label>
                                        <select id="state">
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
                                            maxLength={8}
                                            value={getZipCode}
                                            onChange={(event) => setZipCode(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="button-total">

                            <div>
                                <p>Frete: R$ {getFreightFinalPrice}</p>
                                <p>Total: R$ {cartContext.totalPriceState}</p>
                            </div>

                            <button
                                type='submit'
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
                }
            `}</style>
        </>
    );
}

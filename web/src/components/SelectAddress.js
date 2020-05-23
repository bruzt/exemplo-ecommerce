import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';

//import api from '../services/api';

import { useUser } from '../context/userContext';
import { useCart } from '../context/cartContext';
import { useOrder } from '../context/orderContext';

import PageLayout from './PageLayout';

export default function Address() {

    const [showAddAddrState, setshowAddAddr] = useState(false);
    const [disableAddAddrState, setDisableAddAddr] = useState(true);

    const [streetState, setStreet] = useState('');
    const [numberState, setNumber] = useState('');
    const [neighborhoodState, setNeighborhood] = useState('');
    const [cityState, setCity] = useState('');
    const [stateState, setState] = useState('');
    const [zipCodeState, setZipCode] = useState('');

    const [getDisabledPaymentButton, setDisabledPaymentButton] = useState(true);

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    useEffect( () => {

        cartContext.setAddressId(null);

    }, []);

    useEffect( () => {

        handleDisabledPaymentButton();
        
    }, [cartContext.addressIdState]);

    useEffect( () => {

        if( streetState.length < 3 ||
            numberState.length < 1 ||
            neighborhoodState.length < 3 ||
            cityState.length < 3 ||
            stateState.length < 1 ||
            zipCodeState.length < 8 ||
            zipCodeState.length > 9
        ){
            setDisableAddAddr(true)

        } else setDisableAddAddr(false)

    }, [streetState, numberState, neighborhoodState, cityState, stateState, zipCodeState]);

    useEffect(() => {

        if(zipCodeState.length > 0){
            
            let cepInput = String(zipCodeState);

            if(cepInput.length < 9) cepInput = cepInput.replace(/[^0-9]/g, "");

            if(cepInput.length == 8){

                const part1 = cepInput.slice(0,5);
                const part2 = cepInput.slice(5,8);
                
                cepInput = `${part1}-${part2}`;
            }

            setZipCode(cepInput);
        }

    }, [zipCodeState]);

    function switchShowAddAddr(){

        if(showAddAddrState) setshowAddAddr(false);
        else setshowAddAddr(true);
    }

    function handleAddAddress(event){

        event.preventDefault();

        const add = userContext.addAddress({
            street: streetState,
            number: numberState,
            neighborhood: neighborhoodState,
            city: cityState,
            state: stateState,
            zipcode: zipCodeState
        });
        
        if(add){
            setshowAddAddr(false);
            setStreet('');
            setNumber('');
            setNeighborhood('');
            setCity('');
            setState('');
            setZipCode('');      
        }
    }

    function handleDeleteAddress(id){
        
        if(cartContext.addressIdState == id) cartContext.setAddressId(null);
        
        userContext.deleteAddress(id);
    }

    function handleDisabledPaymentButton(){

        const [ address ] = userContext.userData.addresses.filter( (address) => address.id == cartContext.addressIdState);

        if(cartContext.addressIdState == null || address.zipcode != cartContext.cepInputState){

            setDisabledPaymentButton(true);

        } else {

            setDisabledPaymentButton(false);
        }
    }

    return (
        <>
            <Head>
                <title>Seleção de endereço</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    <button 
                        type='button'
                        title='Voltar'
                        className='back-button'
                        onClick={() => orderContext.setOrder('cart')}
                    >
                        <FaArrowLeft />
                    </button>

                    <h1>Selecione um endereço para a entrega</h1>

                    <div className='addr-grid'>

                        {userContext.userData.addresses.map( (address) => {
                            return (
                                <div key={address.id} className={`addr-card ${(cartContext.addressIdState == address.id) ? 'selected' : ''}`}>
                                    <div className='addr-data'>
                                        <div className='addr-remove'>
                                            <button 
                                                type="button"
                                                onClick={() => handleDeleteAddress(address.id)}
                                            >
                                                X
                                            </button>
                                        </div>
                                        
                                        <a 
                                            onClick={() => cartContext.setAddressId(address.id)}
                                        >
                                            <div>
                                                <p>Logradouro: {address.street}</p>
                                                <p>Nº: {address.number}</p>
                                                <p>Bairro: {address.neighborhood}</p>
                                                <p>Cidade: {address.city}</p>
                                                <p>Estado: {address.state}</p>
                                                <p>CEP: {address.zipcode}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className='add-select-buttons'>
                        <button 
                            className='add-button'
                            type='button'
                            onClick={switchShowAddAddr}
                        >
                            Adicionar Endereço
                        </button>
                        <button
                            className='select-button'
                            disabled={getDisabledPaymentButton}
                            onClick={() => orderContext.setOrder('payment')}
                        >
                            Ir para pagamento
                        </button>
                    </div>

                    {showAddAddrState && (
                        <form className='add-addr-form'>
                            
                            <div className='flex-column'>
                                <label htmlFor="street">Logradouro: </label>
                                <input id='street' type="text" value={streetState} onChange={(event) => setStreet(event.target.value)} />
                            </div>
                        
                            <div className='flex-row'>
                                <div className='flex-column'>
                                    <label htmlFor="number"> Nº: </label>
                                    <input id='number' type="text" value={numberState} onChange={(event) => setNumber(event.target.value)} />
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor="district">Bairro: </label>
                                    <input id='district' type="text" value={neighborhoodState} onChange={(event) => setNeighborhood(event.target.value)} />
                                </div>
                            </div>

                            <div  className='flex-row'>
                                <div className='flex-column'>
                                    <label htmlFor="city">Cidade: </label>
                                    <input id='city' type="text" value={cityState} onChange={(event) => setCity(event.target.value)} />
                                </div>

                                <div className='flex-column'>
                                    <label htmlFor="state"> Estado: </label>
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
                                    <label htmlFor="zipcode">CEP: </label>
                                    <input 
                                        id='zipcode' 
                                        type="text" 
                                        maxLength={8}
                                        value={zipCodeState} onChange={(event) => setZipCode(event.target.value)} 
                                    />
                                </div>
                            </div>

                            <button 
                                className='addr-submit'
                                type='submit'
                                disabled={disableAddAddrState}
                                onClick={handleAddAddress}
                            >
                                Cadastrar
                            </button>
                        </form>
                    )}
                    

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

                h1 {
                    text-align: center;
                    margin: 20px;
                }

                .addr-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 10px;

                    min-height: 220px;
                    border: 1px solid #60615b;
                    border-radius: 5px;
                    padding: 10px;
                }

                .addr-grid a {
                    cursor: pointer;
                }

                .addr-card {
                    border: 1px solid #60615b;
                    border-radius: 5px;
                    background: #c9c9c9;
                    height: 220px;
                }

                .selected {
                    border: 3px solid ${(getDisabledPaymentButton) ? '#a32e39' : '#3E8C34'}
                }

                .addr-card .addr-data a div {
                    padding: 15px;
                    line-height: 25px;
                    height: 100%;
                }

                .addr-card .addr-data .addr-remove {
                    display: flex;
                    justify-content: flex-end;
                    margin: 10px 10px 0 0;
                }

                .addr-data .addr-remove button {
                    font-weight: bold;
                    padding: 4px 8px;
                    border: 0;
                    border-radius: 5px;
                    background: #a32e39;
                    cursor: pointer;
                }

                .addr-data .addr-remove button:hover {
                    background: #bf2232;
                }

                .addr-data .addr-remove button:active {
                    background: #a32e39;
                }

                .addr-data p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .add-select-buttons {
                    display: flex;
                    justify-content: space-between;
                }

                .add-select-buttons button {
                    margin: 20px 0 0 0;
                    width: 200px;
                    height: 50px;
                    border: 0;
                    border-radius: 5px;
                    font-size: 20px;
                    cursor: pointer;                    
                }

                .add-select-buttons .add-button {
                    background: #2A77BB;
                }

                .add-select-buttons .add-button:hover {
                    background: #0087FF;
                }

                .add-select-buttons .add-button:active {
                    background: #2A77BB;
                }
                
                .add-select-buttons .select-button {
                    background: #3E8C34;
                }

                .add-select-buttons .select-button:hover {
                    background: #41A933;
                }

                .add-select-buttons .select-button:active {
                    background: #3E8C34;
                }

                .add-select-buttons .select-button:disabled {
                    background: #a32e39;
                }

                .add-select-buttons .select-button:disabled:hover {
                    background: #bf2232;
                }

                .add-addr-form {
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0 0 0;
                    border: 1px solid #60615b;
                    border-radius: 5px;
                    padding: 20px;
                    width: 480px;
                    max-width: 50%;
                    background: #c9c9c9;
                }

                .flex-row {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }

                .flex-row input {
                    margin: 0 5px;
                }

                .flex-column {
                    display: flex;
                    flex-direction: column;
                    
                }

                .add-addr-form div {
                    margin: 0 0 10px 0;
                }

                .add-addr-form label {
                    margin: 0 0 0 5px;
                }

                .add-addr-form input, select {
                    height: 30px;
                    padding: 3px;
                    font-size: 20px;
                    border: 0;
                    border-radius: 5px;
                }

                .add-addr-form #street {
                    width: 100%;   
                }

                .add-addr-form #number {
                    width: 100%;
                    max-width: 150px;
                }

                .add-addr-form #district {
                    width: 100%;
                }

                .add-addr-form #city {
                    width: 240px;
                }

                .add-addr-form #state {
                    width: 100%;
                    min-width: 65px;   
                    background: #fff;
                }

                .add-addr-form #zipcode {
                    width: 100%;
                    text-align: center;
                }

                .addr-submit {
                    width: 50%; 
                    height: 40px;
                    align-self: center;
                    border: 0;
                    border-radius: 5px;
                    background: ${(disableAddAddrState) ? '#a32e39' : '#3E8C34'};
                    font-size: 20px;
                    cursor: pointer;
                }

                .addr-submit:hover {
                    background: ${(disableAddAddrState) ? '#bf2232' : '#41A933'};
                }

                .addr-submit:active {
                    background: #3E8C34;
                }

                .go-payment-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }
            `}</style>
        </>
    );
}

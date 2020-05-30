import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';

import { useUser } from '../context/userContext';
import { useCart } from '../context/cartContext';
import { useOrder } from '../context/orderContext';

import PageLayout from './PageLayout';

export default function Address() {

    const [getShowAddAddr, setShowAddAddr] = useState(false);
    const [getDisableAddAddrButton, setDisableAddAddrButton] = useState(true);

    const [getStreet, setStreet] = useState('');
    const [getNumber, setNumber] = useState('');
    const [getNeighborhood, setNeighborhood] = useState('');
    const [getCity, setCity] = useState('');
    const [getState, setState] = useState('');
    const [getZipCode, setZipCode] = useState('');

    const [getDisabledGoToPaymentButton, setDisabledGoToPaymentButton] = useState(true);

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    useEffect( () => {

        cartContext.setAddressId(null);

    }, []);

    useEffect( () => {

        if( getStreet.length < 3 ||
            getNumber.length < 1 ||
            getNeighborhood.length < 3 ||
            getCity.length < 3 ||
            getState.length < 1 ||
            getZipCode.length < 8 ||
            getZipCode.length > 9
        ){
            setDisableAddAddrButton(true)

        } else setDisableAddAddrButton(false)

    }, 
        [
            getStreet, 
            getNumber, 
            getNeighborhood, 
            getCity, getState, 
            getZipCode
        ]
    );

    function switchShowAddAddr(){

        if(getShowAddAddr) setShowAddAddr(false);
        else setShowAddAddr(true);
    }

    function handleAddAddress(event){

        event.preventDefault();

        const add = userContext.addAddress({
            street: getStreet,
            number: getNumber,
            neighborhood: getNeighborhood,
            city: getCity,
            state: getState,
            zipcode: getZipCode
        });
        
        if(add){
            setShowAddAddr(false);
            setStreet('');
            setNumber('');
            setNeighborhood('');
            setCity('');
            setState('');
            setZipCode('');      
        }
    }

    function handleDeleteAddress(id){
        
        if(cartContext.getAddressId == id) cartContext.setAddressId(null);
        
        userContext.deleteAddress(id);
    }

    function handleDisabledGoToPaymentButton(addrId){

        const [ address ] = userContext.getUser.addresses.filter( (address) => address.id == addrId);

        if(addrId == null || !address || address.zipcode != cartContext.getZipCode){

            cartContext.setAddressId(addrId);
            setDisabledGoToPaymentButton(true);

        } else {

            cartContext.setAddressId(addrId);
            setDisabledGoToPaymentButton(false);
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

                        {(userContext.getUser.addresses) 
                            ? userContext.getUser.addresses.map( (address) => {
                                    return (
                                        <div key={address.id} className={`addr-card ${(cartContext.getAddressId == address.id) ? 'selected' : ''}`}>
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
                                                    onClick={() => handleDisabledGoToPaymentButton(address.id)}
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
                                }
                            ) 
                            : null
                        }
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
                            disabled={getDisabledGoToPaymentButton}
                            onClick={() => orderContext.setOrder('payment')}
                        >
                            Ir para pagamento
                        </button>
                    </div>

                    {getShowAddAddr && (
                        <form className='add-addr-form'>
                            
                            <div className='flex-column'>
                                <label htmlFor="street">Logradouro: </label>
                                <input id='street' type="text" value={getStreet} onChange={(event) => setStreet(event.target.value)} />
                            </div>
                        
                            <div className='flex-row'>
                                <div className='flex-column'>
                                    <label htmlFor="number"> Nº: </label>
                                    <input id='number' type="text" value={getNumber} onChange={(event) => setNumber(event.target.value)} />
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor="district">Bairro: </label>
                                    <input id='district' type="text" value={getNeighborhood} onChange={(event) => setNeighborhood(event.target.value)} />
                                </div>
                            </div>

                            <div  className='flex-row'>
                                <div className='flex-column'>
                                    <label htmlFor="city">Cidade: </label>
                                    <input id='city' type="text" value={getCity} onChange={(event) => setCity(event.target.value)} />
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
                                        maxLength={9}
                                        value={getZipCode} onChange={(event) => setZipCode(userContext.formatZipCode(event.target.value))} 
                                    />
                                </div>
                            </div>

                            <button 
                                className='addr-submit'
                                type='submit'
                                disabled={getDisableAddAddrButton}
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
                    padding: 20px 0;
                }

                .back-button {
                    border: 0;
                    background: transparent;
                    font-size: 30px;
                    cursor: pointer;
                    color: inherit;
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
                    border: 1px solid #0D2235;
                    border-radius: 5px;
                    padding: 10px;
                }

                .addr-grid a {
                    cursor: pointer;
                }

                .addr-card {
                    border-radius: 5px;
                    background: #0D2235;
                    height: 220px;
                }

                .selected {
                    border: 3px solid ${(getDisabledGoToPaymentButton) ? '#a32e39' : '#3E8C34'}
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
                    color: inherit;   
                }

                .add-select-buttons .add-button {
                    background: #0D2235;
                }

                .add-select-buttons .add-button:hover {
                    background: #16324C;
                }

                .add-select-buttons .add-button:active {
                    background: #0D2235;
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
                    color: inherit;
                }

                .add-select-buttons .select-button:disabled:hover {
                    background: #bf2232;
                }

                .add-addr-form {
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0 0 0;
                    border-radius: 5px;
                    padding: 20px;
                    width: 480px;
                    max-width: 50%;
                    background: #0D2235;
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
                    background: ${(getDisableAddAddrButton) ? '#a32e39' : '#3E8C34'};
                    font-size: 20px;
                    cursor: pointer;
                    color: inherit;
                }

                .addr-submit:hover {
                    background: ${(getDisableAddAddrButton) ? '#bf2232' : '#41A933'};
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

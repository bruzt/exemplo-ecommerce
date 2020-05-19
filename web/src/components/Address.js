import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import api from '../services/api';

import { useLogin } from '../context/loginContext';
import { useCart } from '../context/cartContext';

import PageLayout from './PageLayout';

export default function Address() {

    const [showAddAddrState, setshowAddAddr] = useState(false);

    const [streetState, setStreet] = useState('');
    const [numberState, setNumber] = useState('');
    const [districtState, setDistrict] = useState('');
    const [cityState, setCity] = useState('');
    const [stateState, setState] = useState('');
    const [zipCodeState, setZipCode] = useState('');

    const loginContext = useLogin();
    const cartContext = useCart();

    useEffect( () => {

        cartContext.setAddressId(null)

    }, []);

    function handleAddressPick(id){

        if(cartContext.addressIdState != null && cartContext.addressIdState != id){

            document.getElementById(cartContext.addressIdState).checked = false;
            cartContext.setAddressId(id);
            
        } else {
            
            document.getElementById(id).checked = true;
            cartContext.setAddressId(id);
        }
    }

    function switchShowAddAddr(){

        if(showAddAddrState) setshowAddAddr(false);
        else setshowAddAddr(true);
    }

    async function handleAddAddress(event){

        event.preventDefault();

        try {

            const response = await api.post('/addresses', {
                street: streetState,
                number: numberState,
                district: districtState,
                city: cityState,
                state: stateState,
                zipcode: zipCodeState
            });

            const user = loginContext.userData;
            user.addresses.push(response.data);
            loginContext.setUser(user);

            setshowAddAddr(false);
            setStreet('');
            setNumber('');
            setDistrict('');
            setCity('');
            setState('');
            setZipCode('');
                
        } catch (error) {
            console.error(error);
            alert('Erro, tente novamente');
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

                    <h1>Selecione um endereço</h1>

                    <div className='addr-grid'>

                        {loginContext.userData.addresses.map( (address) => {
                            return (
                                <div className='addr-card' key={address.id}>
                                    <div className='addr-radio'>
                                        <input type="radio" id={address.id} onChange={(event) => handleAddressPick(event.target.id)} />
                                    </div>
                                    <div className='addr-data'>
                                        <div className='addr-remove'>
                                            <button type="button">
                                                X
                                            </button>
                                        </div>
                                        <div>
                                            <p>Rua: {address.street}</p>
                                            <p>Nº: {address.number}</p>
                                            <p>Bairro: {address.district}</p>
                                            <p>Cidade: {address.city}</p>
                                            <p>Estado: {address.state}</p>
                                            <p>CEP: {address.zipcode}</p>
                                        </div>
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
                            disabled={(cartContext.addressIdState != null) ? false : true}
                        >
                            Ir para pagamento
                        </button>
                    </div>

                    {showAddAddrState && (
                        <form className='add-addr-form'>
                            
                            <div className='flex-column'>
                                <label htmlFor="street">Rua: </label>
                                <input id='street' type="text" value={streetState} onChange={(event) => setStreet(event.target.value)} />
                            </div>
                        
                            <div className='flex-row'>
                                <div className='flex-column'>
                                    <label htmlFor="number"> Nº: </label>
                                    <input id='number' type="text" value={numberState} onChange={(event) => setNumber(event.target.value)} />
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor="district">Bairro: </label>
                                    <input id='district' type="text" value={districtState} onChange={(event) => setDistrict(event.target.value)} />
                                </div>
                            </div>

                            <div  className='flex-row'>
                                <div className='flex-column'>
                                    <label htmlFor="city">Cidade: </label>
                                    <input id='city' type="text" value={cityState} onChange={(event) => setCity(event.target.value)} />
                                </div>

                                <div className='flex-column'>
                                    <label htmlFor="state"> Estado: </label>
                                    <select id="state" onChange={(event) => setState(event.target.value)}>
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
                                    <input id='zipcode' type="text" value={zipCodeState} onChange={(event) => setZipCode(event.target.value)} />
                                </div>
                            </div>

                            <button 
                                className='addr-submit'
                                type='submit'
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
                    padding: 10px;
                }

                .addr-card {
                    border: 1px solid #60615b;
                    display: grid;
                    grid-template-columns: 30px 1fr;
                    height: 220px;
                }

                .addr-card .addr-radio {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: #c9c9c9;
                }

                .addr-card .addr-radio input {
                    height: 20px;
                    width: 20px;
                }

                .addr-card .addr-data {
                    padding: 15px;
                    line-height: 25px;
                }

                .addr-card .addr-data .addr-remove {
                    display: flex;
                    justify-content: flex-end;
                }

                .addr-data .addr-remove button {
                    font-weight: bold;
                    padding: 4px 8px;
                    border: 0;
                    border-radius: 5px;
                    background: #a32e39;
                }

                .addr-data .addr-remove button:active {
                    background: #bf2232;
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
                    background: ${(cartContext.addressIdState != null) ? '#3E8C34' : '#a32e39'};
                }

                .add-select-buttons .select-button:hover {
                    background: ${(cartContext.addressIdState != null) ? '#41A933' : '#bf2232'};
                }

                .add-select-buttons .select-button:active {
                    background: ${(cartContext.addressIdState != null) ? '#3E8C34' : '#a32e39'};
                }

                .add-addr-form {
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0 0 0;
                    border: 1px solid #60615b;
                    padding: 20px;
                    width: 480px;
                    max-width: 50%;
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
                }

                .add-addr-form #zipcode {
                    width: 100%;
                }

                .addr-submit {
                    width: 50%; 
                    height: 40px;
                    align-self: center;
                    border: 0;
                    border-radius: 5px;
                    background: #3E8C34;
                    font-size: 20px;
                }

                .addr-submit:hover {
                    background: #41A933;
                }

                .addr-submit:active {
                    background: #3E8C34;
                }
            `}</style>
        </>
    );
}

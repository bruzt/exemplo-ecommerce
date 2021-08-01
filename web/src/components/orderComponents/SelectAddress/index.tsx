import React, { FormEvent, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Head from 'next/head';
import axios from 'axios';

import formatZipCode from '../../../utils/formatZipCode';

import { useUser } from '../../../contexts/userContext';
import { useCart } from '../../../contexts/cartContext';
import { useOrder } from '../../../contexts/orderContext';

import { Container } from './styles';

export default function SelectAddress() {

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    const [getShowAddAddr, setShowAddAddr] = useState(false);
    const [getDisableAddAddrButton, setDisableAddAddrButton] = useState(true);

    const [getUfs, setUfs] = useState([]);
    const [getCities, setCities] = useState([]);

    const [getStreet, setStreet] = useState('');
    const [getNumber, setNumber] = useState('');
    const [getNeighborhood, setNeighborhood] = useState('');
    const [getCity, setCity] = useState('0');
    const [getUf, setUf] = useState('0');
    const [getZipCode, setZipCode] = useState('');

    const [getDisabledGoToPaymentButton, setDisabledGoToPaymentButton] = useState(true);

    useEffect(() => {
        if(process.browser) window.scrollTo({ top: 0 });
    
        cartContext.setAddressId(null);
        fetchUfs();
    }, []);

    useEffect(() => {

        if (getUf != '0') {

            fetchCities();
            setCity('0');
        }

    }, [getUf]);

    useEffect(() => {

        if (getStreet.length < 3 ||
            getNumber.length < 1 ||
            getNeighborhood.length < 3 ||
            getCity == '0' ||
            getUf == '0' ||
            getZipCode.length < 8 ||
            getZipCode.length > 9
        ) {
            setDisableAddAddrButton(true)

        } else setDisableAddAddrButton(false)

    },
        [
            getStreet,
            getNumber,
            getNeighborhood,
            getCity,
            getUf,
            getZipCode
        ]
    );

    async function fetchUfs() {

        try {

            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

            setUfs(response.data);

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erro ao buscar lista de estados')
        }
    }

    async function fetchCities() {

        try {

            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${getUf}/municipios`);

            setCities(response.data);

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erro ao buscar lista de estados')
        }
    }

    function switchShowAddAddr() {

        if (getShowAddAddr) setShowAddAddr(false);
        else setShowAddAddr(true);
    }

    function handleAddAddress(event: FormEvent) {

        event.preventDefault();

        if(getDisableAddAddrButton) return;

        setDisableAddAddrButton(true);

        const add = userContext.addAddress({
            street: getStreet,
            number: getNumber,
            neighborhood: getNeighborhood,
            city: getCity,
            state: getUf,
            zipcode: getZipCode
        });

        if (add) {
            setShowAddAddr(false);
            setStreet('');
            setNumber('');
            setNeighborhood('');
            setCity('0');
            setUf('0');
            setZipCode('');

        } else setDisableAddAddrButton(false);
    }

    function handleDeleteAddress(id: number) {

        if (cartContext.getAddressId == id) cartContext.setAddressId(null);

        userContext.deleteAddress(id);
    }

    function handleDisabledGoToPaymentButton(addrId: number) {

        const [address] = userContext.getUser.addresses.filter((address) => address.id == addrId);

        if (addrId == null || !address || address.zipcode != cartContext.getZipCode) {

            cartContext.setAddressId(addrId);
            setDisabledGoToPaymentButton(true);

        } else {

            cartContext.setAddressId(addrId);
            setDisabledGoToPaymentButton(false);
        }
    }

    function handleGoToPayment(){

        if(getDisabledGoToPaymentButton) return;

        orderContext.setOrderFlowNumber(3);
    }

    return (
        <>
            <Head>
                <title>Selecione o endereço</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Container>

                <button
                    type='button'
                    title='Voltar'
                    className='back-button'
                    onClick={() => orderContext.setOrderFlowNumber(1)}
                >
                    <FaArrowLeft />
                </button>

                <h1>Selecione um endereço para a entrega</h1>

                <div className='addr-grid'>

                    {userContext.getUser.addresses.map((address) => {
                        return (
                            <div
                                key={address.id}
                                className={`
											addr-card 
											${(cartContext.getAddressId == address.id) ? 'selected' : ''} 
											${(getDisabledGoToPaymentButton) ? 'disabled' : ''}
										`}
                            >
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
                                            <p>Cidade: {address.city} - {address.state}</p>
                                            <p>CEP: {address.zipcode}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        );
                    }
                    )}
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
                        onClick={handleGoToPayment}
                    >
                        {(getDisabledGoToPaymentButton)
                            ? 'CEP diferente do calculado'
                            : 'Ir para pagamento'
                        }

                    </button>
                </div>

                {getShowAddAddr && (
                    <form className='add-addr-form' onSubmit={handleAddAddress}>

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

                        <div className='flex-row'>
                            <div className='flex-column'>
                                <label htmlFor="city">Cidade: </label>
                                <select
                                    id="city"
                                    value={getCity}
                                    onChange={(event) => setCity(event.target.value)}
                                >
                                    <option
                                        value="0"
                                    >
                                        {(getUf == '0') ? 'Selecione o estado' : ''}
                                    </option>
                                    {getCities.map((city) => (
                                        <option
                                            key={city.id}
                                            value={city.nome}
                                        >
                                            {city.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex-column'>
                                <label htmlFor="state"> Estado: </label>
                                <select
                                    id="state"
                                    value={getUf}
                                    onChange={(event) => setUf(event.target.value)}
                                >
                                    <option value="0"></option>
                                    {getUfs.map((uf) => (
                                        <option
                                            key={uf.id}
                                            value={`${uf.sigla.toUpperCase()}`}
                                        >
                                            {`${uf.sigla.toUpperCase()}`}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div className='flex-column'>
                                <label htmlFor="zipcode">CEP: </label>
                                <input
                                    id='zipcode'
                                    type="text"
                                    maxLength={9}
                                    value={getZipCode}
                                    onChange={(event) => setZipCode(formatZipCode(event.target.value))}
                                />
                            </div>
                        </div>

                        <button
                            className='addr-submit'
                            type='submit'
                            disabled={getDisableAddAddrButton}
                        >
                            Adicionar
                        </button>
                    </form>
                )}

            </Container>
        </>
    );
}

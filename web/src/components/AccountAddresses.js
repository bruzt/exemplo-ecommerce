import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useUser } from '../context/userContext';

export default function AccountAddresses() {

    const userContext = useUser();

    const [getUfs, setUfs] = useState([]);
    const [getCities, setCities] = useState([]);

    const [getStreet, setStreet] = useState('');
    const [getNumber, setNumber] = useState('');
    const [getNeighborhood, setNeighborhood] = useState('');
    const [getUf, setUf] = useState('0');
    const [getCity, setCity] = useState('0');
    const [getZipCode, setZipCode] = useState('');

    const [getDisabledAddAddrButton, setDisabledAddAddrButton] = useState(true);

    useEffect(() => {

        fetchUfs();

    }, []);

    useEffect(() => {

        if (getUf != '0'){
            fetchCities();
            setCity('0');
        }

    }, [getUf]);

    useEffect( () => {

        if(
            getStreet.length > 2 &&
            getNumber.length > 0 &&
            getNeighborhood.length > 2 &&
            getCity != '0' &&
            getUf != '0' &&
            getZipCode.length == 9
        ){

            setDisabledAddAddrButton(false);

        } else setDisabledAddAddrButton(true);

    }, [
       getStreet,
       getNumber,
       getNeighborhood,
       getCity,
       getUf,
       getZipCode 
    ]);

    async function fetchUfs() {

        try {

            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

            setUfs(response.data);

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erro ao buscar lista de estados');
        }
    }

    async function fetchCities() {

        try {

            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${getUf}/municipios`);

            setCities(response.data);

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erro ao buscar lista de cidades');
        }
    }

    function handleAddAddress(event){

        event.preventDefault();

        setDisabledAddAddrButton(true);

        const add = userContext.addAddress({
            street: getStreet,
            number: getNumber,
            neighborhood: getNeighborhood,
            city: getCity,
            state: getUf,
            zipcode: getZipCode
        });
        
        if(add){
            setStreet('');
            setNumber('');
            setNeighborhood('');
            setCity('0');
            setUf('0');
            setZipCode('');    

        } else setDisabledAddAddrButton(false);
    }

    return (
        <>
            <section>

                <h1>Gerenciar Endereços</h1>

                <div className="address-grid">

                    {userContext.getUser.addresses.map((address) => (
                        <div className="address-card" key={address.id}>
                            <div className="card-header">
                                <button
                                    type='button'
                                    onClick={() => userContext.deleteAddress(address.id)}
                                >
                                    X
                                </button>
                            </div>
                            <div className="card-body">
                                <p>Logradouro: {address.street}</p>
                                <p>Numero: {address.number}</p>
                                <p>Bairro: {address.neighborhood}</p>
                                <p>Cidade: {address.city} - {address.state}</p>
                                <p>CEP: {address.zipcode}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <form>

                    <h2>Adicionar endereço</h2>      

                    <div className="input-group">
                        <label htmlFor="street">Logradouro</label>
                        <input
                            type="text"
                            id="street"
                            value={getStreet}
                            onChange={(event) => setStreet(event.target.value)}
                        />
                    </div>

                    <div className='line-group'>
                        <div className="input-group">
                            <label htmlFor="number">Numero</label>
                            <input
                                type="text"
                                id="number"
                                value={getNumber}
                                onChange={(event) => setNumber(event.target.value)}
                            />
                        </div>

                        <div className="input-group w-100">
                            <label htmlFor="neighborhood">Bairro</label>
                            <input
                                type="text"
                                id="neighborhood"
                                value={getNeighborhood}
                                onChange={(event) => setNeighborhood(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className='line-group'>
                        <div className="input-group">
                            <label htmlFor="city">Cidade</label>
                            <select
                                id="city"
                                value={getCity}
                                onChange={(event) => setCity(event.target.value)}
                            >
                                <option 
                                    value='0'
                                >
                                    {(getCities.length == 0) ? 'Selecione o estado' : ''}
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

                        <div className="input-group">
                            <label htmlFor="uf">Estado</label>
                            <select
                                id="uf"
                                value={getUf}
                                onChange={(event) => setUf(event.target.value)}
                            >
                                <option value='0'></option>
                                {(getUfs.map((uf) => (
                                    <option
                                        key={uf.id}
                                        value={`${uf.sigla.toUpperCase()}`}
                                    >
                                        {`${uf.sigla.toUpperCase()}`}
                                    </option>
                                )))}
                            </select>
                        </div>

                        <div className="input-group w-100">
                            <label htmlFor="zipcode">CEP</label>
                            <input
                                type="text"
                                id="zipcode"
                                value={getZipCode}
                                onChange={(event) => setZipCode(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <button 
                            type="submit"
                            disabled={getDisabledAddAddrButton}
                            onClick={(event) => handleAddAddress(event)}
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>

            </section>

            <style jsx>{`
                .w-100 {
                    width: 100%;
                }

                section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                section h1 {
                    margin-bottom: 20px;
                    font-size: 30px;
                }

                div.address-grid {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 10px;
                }

                div.address-card {
                    background: #0D2235;
                    padding: 10px;
                    border-radius: 5px;
                    height: 200px;
                }

                div.card-header {
                    display: flex;
                    justify-content: flex-end;
                }

                div.card-header button {
                    border: 0;
                    border-radius: 5px;
                    padding: 5px 10px;
                    background: #a32e39;
                    cursor: pointer;
                    color: inherit;
                }

                div.card-header button:hover {
                    background: #bf2232;
                }

                div.card-header button:active {
                    background: #a32e39;
                }

                div.card-body {
                    margin-top: 5px;
                }

                div.card-body p {
                    line-height: 30px;
                    font-size: 18px;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }

                form {
                    margin-top: 30px;
                    background: #0D2235;
                    border-radius: 5px;
                    padding: 10px;
                    width: 100%;
                    max-width: 500px;
                }

                form h2 {
                    text-align: center;
                }

                div.input-group {
                    margin-top: 10px;
                    display: flex;
                    flex-direction: column;
                }

                div.line-group {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                }

                form label {
                    margin-left: 5px;
                }

                form input, form select {
                    border: 0;
                    border-radius: 5px;
                    height: 40px;
                    font-size: 20px;
                    padding: 5px;
                }

                input#street {
                    width: 100%;
                }

                input#number {
                    width: 100px;
                    margin-right: 10px;
                }

                input#neighborhood {
                    width: 100%;
                }

                select#city {
                    width: 200px;
                }

                select#uf {
                    width: 100px;
                }

                input#zipcode {
                    width: 100%;
                }

                .line-group select {
                    margin-right: 10px;
                }

                form button[type='submit'] {
                    margin-top: 20px;
                    border: 0;
                    border-radius: 5px;
                    padding: 10px 20px;
                    font-size: 20px;
                    background: #3E8C34;
                    color: inherit;
                    cursor: pointer;
                }

                form button[type='submit']:hover {
                    background: #41A933;
                }

                form button[type='submit']:active {
                    background: #3E8C34;
                }

                form button[type='submit']:disabled {
                    background: #a32e39;
                }

                form button[type='submit']:disabled:hover {
                    background: #bf2232;
                }

                @media (max-width: 768px) {
                    div.address-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </>
    );
} 
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Loading from 'react-loader-spinner';

import { useUser } from '../../../contexts/userContext';
import LoadingModal from '../../LoadingModal';

import { Container } from './styles';

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

    const [getIsFetchingAddAddress, setIsFetchingAddAddress] = useState(false);
    const [getIsFetchingDeleteAddress, setIsFetchingDeleteAddress] = useState(false);

    useEffect(() => {
        fetchUfs();
    }, []);

    useEffect(() => {
        if (getUf != '0') {
            fetchCities();
            setCity('0');
        }
    }, [getUf]);

    useEffect(() => {
        if (
            getStreet.length > 2 &&
            getNumber.length > 0 &&
            getNeighborhood.length > 2 &&
            getCity != '0' &&
            getUf != '0' &&
            getZipCode.length == 9
        ) {
            setDisabledAddAddrButton(false);

        } else {
            setDisabledAddAddrButton(true);
        }
    }, [
        getStreet,
        getNumber,
        getNeighborhood,
        getCity,
        getUf,
        getZipCode
    ]);

    function handleZipcode(zipcode: string) {

        zipcode = zipcode.replace(/[^0-9]/g, "");

        if (zipcode.length == 8) {

            zipcode = `${zipcode.slice(0, 5)}-${zipcode.slice(5, 8)}`
        }

        setZipCode(zipcode);
    }


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

    async function handleAddAddress(event: FormEvent) {

        event.preventDefault();

        if (getDisabledAddAddrButton || getIsFetchingAddAddress) return;

        setIsFetchingAddAddress(true);
        const add = await userContext.addAddress({
            street: getStreet,
            number: getNumber,
            neighborhood: getNeighborhood,
            city: getCity,
            state: getUf,
            zipcode: getZipCode
        });
        setIsFetchingAddAddress(false);

        if (add) {
            setStreet('');
            setNumber('');
            setNeighborhood('');
            setCity('0');
            setUf('0');
            setZipCode('');

        } else setIsFetchingAddAddress(false);
    }

    async function handleDeleteAddress(id: number) {

        setIsFetchingDeleteAddress(true);
        await userContext.deleteAddress(id);
        setIsFetchingDeleteAddress(false);
    }

    return (
        <Container data-testid='addresses-component'>

            {getIsFetchingDeleteAddress && <LoadingModal spinnerSize='10rem' />}

            <h1>Gerenciar Endereços</h1>

            <div className="address-grid">

                {userContext.getUser.addresses.map((address) => (
                    <div
                        className="address-card"
                        key={address.id}
                        data-testid="address-card"
                    >
                        <div className="card-header">
                            <button
                                type='button'
                                onClick={() => handleDeleteAddress(address.id)}
                                data-testid='remove-address-button'
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
                        data-testid="street"
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
                            data-testid="number"
                            value={getNumber}
                            onChange={(event) => setNumber(event.target.value)}
                        />
                    </div>

                    <div className="input-group w-100">
                        <label htmlFor="neighborhood">Bairro</label>
                        <input
                            type="text"
                            id="neighborhood"
                            data-testid="neighborhood"
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
                            data-testid="city"
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
                            data-testid="uf"
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
                            data-testid="zipcode"
                            maxLength={9}
                            value={getZipCode}
                            onChange={(event) => handleZipcode(event.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <button
                        type="submit"
                        disabled={getDisabledAddAddrButton || getIsFetchingAddAddress}
                        className={`${getIsFetchingAddAddress && 'is-fetching'}`}
                        onClick={(event) => handleAddAddress(event)}
                        data-testid="submit-address-button"
                    >
                        {getIsFetchingAddAddress
                            ? (
                                <Loading
                                    type="TailSpin"
                                    color='#0D2235'
                                    height='1.875rem'
                                    width='1.875rem'
                                />
                            )
                            : (
                                'Cadastrar'
                            )
                        }
                    </button>
                </div>
            </form>

        </Container>
    );
}

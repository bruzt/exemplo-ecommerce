import React, { useState, useEffect, FormEvent } from 'react';
import Loading from 'react-loader-spinner';

import api from '../../../services/api';
import formatCpf from '../../../utils/formatCpf';

import { useUser } from '../../../contexts/userContext';

import { Container } from './styles';

export default function AccountGeneral() {

    const userContext = useUser();

    const [getName, setName] = useState(userContext.getUser.name || '');
    const [getEmail, setEmail] = useState(userContext.getUser.email || '');
    const [getCpf, setCpf] = useState(userContext.getUser.cpf || '');
    const [getCurrentPassword, setCurrentPassword] = useState('');
    const [getNewPassword, setNewPassword] = useState('');
    const [getConfirmNewPassword, setConfirmNewPassword] = useState('');

    const [getDisabledSubmitButton, setDisabledSubmitButton] = useState(true);
    const [getIsFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (
            (getName.trim() != userContext.getUser.name &&
                getName.trim().length > 2) ||
            (getEmail.trim() != userContext.getUser.email &&
                getEmail.trim().length > 7) ||
            (getCpf.trim() != userContext.getUser.cpf &&
                getCpf.trim().length == 11) ||
            getCurrentPassword.trim().length > 5 &&
            getNewPassword.trim().length > 5 &&
            getNewPassword == getConfirmNewPassword
        ) {
            setDisabledSubmitButton(false);

        } else {
            setDisabledSubmitButton(true);
        }
    }, [
        getName,
        getEmail,
        getCpf,
        getCurrentPassword,
        getNewPassword,
        getConfirmNewPassword
    ]);

    function handleSetCpf(event: React.ChangeEvent<HTMLInputElement>) {

        const cpf = String(event.target.value).replace(/\.|-/g, '');

        setCpf(cpf);
    }

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        if (getDisabledSubmitButton || getIsFetching) return;

        const data = {
            name: (getName.trim() == userContext.getUser.name) ? undefined : getName.trim(),
            email: (getEmail.trim() == userContext.getUser.email) ? undefined : getEmail.trim(),
            cpf: (getCpf.trim() == userContext.getUser.cpf) ? undefined : getCpf.trim().replace(/\.|-/g, ''),
            currentPassword: (getCurrentPassword.trim().length == 0) ? undefined : getCurrentPassword.trim(),
            newPassword: (getNewPassword.trim().length == 0) ? undefined : getNewPassword.trim()
        }

        try {

            setIsFetching(true);
            await api.put('/users', data);

            const user = { ...userContext.getUser };
            if (getName != userContext.getUser.name) user.name = data.name;
            if (getEmail != userContext.getUser.email) user.email = data.email
            if (getCpf != userContext.getUser.cpf) user.cpf = data.cpf
            userContext.setUser(user);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setIsFetching(false);
            alert('Dados alterados')

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erro ao atualizar dados');
            setIsFetching(false);
        }
    }

    return (
        <>
            <Container data-testid='account-data-component'>

                {(Object.keys(userContext.getUser).length) > 0 && (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <h1>Dados da conta</h1>

                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id='name'
                                data-testid='name'
                                value={getName}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">e-mail</label>
                            <input
                                type="email"
                                data-testid='email'
                                id='email'
                                value={getEmail}
                                onChange={(event) => setEmail(event.target.value.trim())}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                id='cpf'
                                data-testid='cpf'
                                maxLength={14}
                                value={formatCpf(getCpf).cpf}
                                onChange={handleSetCpf}
                            />
                        </div>

                        <div className='change-password-group'>
                            <h2>Trocar senha</h2>

                            <div className='row-group'>
                                <div className="form-group">
                                    <label htmlFor="current-password">Senha Atual</label>
                                    <input
                                        type="password"
                                        id='current-password'
                                        data-testid='current-password'
                                        value={getCurrentPassword}
                                        onChange={(event) => setCurrentPassword(event.target.value.trim())}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new-password">
                                        Nova senha <span>(no mínimo 6 dígitos)</span>
                                    </label>
                                    <input
                                        type="password"
                                        id='new-password'
                                        data-testid='new-password'
                                        value={getNewPassword}
                                        onChange={(event) => setNewPassword(event.target.value.trim())}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm-new-password">Confirmar nova senha</label>
                                    <input
                                        type="password"
                                        id='confirm-new-password'
                                        data-testid='confirm-new-password'
                                        value={getConfirmNewPassword}
                                        onChange={(event) => setConfirmNewPassword(event.target.value.trim())}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={getDisabledSubmitButton || getIsFetching}
                            className={`${getIsFetching && 'is-fetching'}`}
                            data-testid='save-button'
                        >
                            {getIsFetching
                                ? (
                                    <Loading
                                        type="TailSpin"
                                        color='#0D2235'
                                        height='2rem'
                                        width='2rem'
                                    />

                                )
                                : (
                                    'Salvar'
                                )
                            }
                        </button>

                    </form>
                )}

            </Container>
        </>
    );
}

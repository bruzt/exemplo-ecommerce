import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

import { useUser } from '../../../context/userContext';

import { Container } from './styles';

export default function AccountGeneral() {

    const userContext = useUser();

    const [getName, setName] = useState(userContext.getUser.name || '');
    const [getEmail, setEmail] = useState(userContext.getUser.email || '');
    const [getCurrentPassword, setCurrentPassword] = useState('');
    const [getNewPassword, setNewPassword] = useState('');
    const [getConfirmNewPassword, setConfirmNewPassword] = useState('');

    const [getDisabledSubmitButton, setDisabledSubmitButton] = useState(true);

    useEffect(() => {

        if (
            (getName != userContext.getUser.name &&
                getName.length > 2) ||
            (getEmail != userContext.getUser.email &&
                getEmail.length > 7) ||
            getCurrentPassword.length > 5 &&
            getNewPassword.length > 5 &&
            getNewPassword == getConfirmNewPassword
        ) {
            setDisabledSubmitButton(false);

        } else setDisabledSubmitButton(true);

    }, [
        getName,
        getEmail,
        getCurrentPassword,
        getNewPassword,
        getConfirmNewPassword
    ]);

    async function handleSubmit(event) {

        event.preventDefault();

        setDisabledSubmitButton(true);

        const data = {
            name: (getName == userContext.getUser.name) ? undefined : getName.trim(),
            email: (getEmail == userContext.getUser.email) ? undefined : getEmail,
            currentPassword: (getCurrentPassword.length == 0) ? undefined : getCurrentPassword,
            newPassword: (getNewPassword.length == 0) ? undefined : getNewPassword
        }

        try {

            await api.put('/users', data);

            const user = { ...userContext.getUser };
            if (getName != userContext.getUser.name) user.name = data.name;
            if (getEmail != userContext.getUser.email) user.email = data.email
            userContext.setUser(user);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            alert('Salvo!')

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erro ao atualizar dados');
            setDisabledSubmitButton(false);
        }
    }

    return (
        <>
            <Container>

                {(Object.keys(userContext.getUser).length) > 0 && (
                    <form>
                        <h1>Dados da conta</h1>

                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id='name'
                                value={getName}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">e-mail</label>
                            <input
                                type="email"
                                id='email'
                                value={getEmail}
                                onChange={(event) => setEmail(event.target.value.trim())}
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
                                        value={getNewPassword}
                                        onChange={(event) => setNewPassword(event.target.value.trim())}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm-new-password">Confirmar nova senha</label>
                                    <input
                                        type="password"
                                        id='confirm-new-password'
                                        value={getConfirmNewPassword}
                                        onChange={(event) => setConfirmNewPassword(event.target.value.trim())}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={getDisabledSubmitButton}
                            onClick={(event) => handleSubmit(event)}
                        >
                            Salvar
                    </button>

                    </form>
                )}

            </Container>
        </>
    );
}

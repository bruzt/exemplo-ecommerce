import React, { FormEvent, useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { useUser } from '../../../../contexts/userContext';
import formatCpf from '../../../../utils/formatCpf';
import Input from '../genericComponents/Input';
import Button from '../genericComponents/Button';

import { FormContainer } from './styles';

export default function CreateUserForm() {

    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getCpf, setCpf] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const [getIsFetching, setIsFetching] = useState(false);
    const [getDisabledSubmitButton, setDisabledSubmitButton] = useState(true);

    const userContext = useUser();

    useEffect(() => {
        if (
            getName.length > 3 &&
            getEmail.length > 7 &&
            formatCpf(getCpf).valid &&
            getPassword.length > 5 &&
            getConfirmPassword == getPassword
        ) {
            setDisabledSubmitButton(false);
        } else {
            setDisabledSubmitButton(true);
        }
    }, [getName, getEmail, getCpf, getPassword, getConfirmPassword]);

    function handleSetCpf(event: React.ChangeEvent<HTMLInputElement>) {

        const formatedCpf = formatCpf(event.target.value).cpf;

        setCpf(formatedCpf);
    }

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        setIsFetching(true);
        const result = await userContext.createUser(getName, getEmail, getCpf, getPassword);
        setIsFetching(false);

        if(result) userContext.handleSwitchModal();
    }

    return (
        <FormContainer
            onSubmit={handleSubmit}
            data-testid='create-user-form'
        >
            <div className="input-group">
                <label htmlFor="login-name">Nome completo</label>
                <Input
                    type='text'
                    id="login-name"
                    data-testid="login-name"
                    value={getName}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="login-email">e-mail</label>
                <Input
                    type='email'
                    id="login-email"
                    data-testid="login-email"
                    value={getEmail}
                    onChange={(event) => setEmail(event.target.value.trim())}
                />
            </div>

            <div className="input-group">
                <label htmlFor="login-cpf">CPF</label>
                <Input
                    type='text'
                    id="login-cpf"
                    data-testid="login-cpf"
                    maxLength={14}
                    className={`${formatCpf(getCpf).valid == false ? 'invalid' : ''}`}
                    value={getCpf}
                    onChange={handleSetCpf}
                />
            </div>

            <div className="input-group">
                <label htmlFor="login-password">
                    Senha
                </label>
                <Input
                    type='password'
                    id="login-password"
                    data-testid="login-password"
                    value={getPassword}
                    onChange={(event) => setPassword(event.target.value.trim())}
                />
            </div>

            <div className="input-group">
                <label htmlFor="login-confirm-password">Confirmar senha</label>
                <Input
                    type='password'
                    id="login-confirm-password"
                    data-testid="login-confirm-password"
                    value={getConfirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value.trim())}
                />
            </div>

            <Button
                type="submit"
                className={`${(getIsFetching) && 'is-fetching'}`}
                data-testid='create-button'
                disabled={getDisabledSubmitButton || getIsFetching}
            >
                {(getIsFetching)
                    ? (
                        <Loader
                            type="TailSpin"
                            color="#0D2235"
                            height={30}
                            width={30}
                        />
                    )
                    : 'Cadastrar'
                }
            </Button>

        </FormContainer>
    );
}
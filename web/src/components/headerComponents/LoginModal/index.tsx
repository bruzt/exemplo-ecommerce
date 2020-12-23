import React, { useState, useEffect, useRef, FormEvent } from 'react';

import formatCpf from '../../../utils/formatCpf';

import { useUser } from '../../../contexts/userContext';

import ForgotPasswordModal from '../../forgotPassComponents/ForgotPasswordModal';

import { Container } from './styles';

export default function LoginModal() {
	
	const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getCpf, setCpf] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const [getDisabledButton, setDisabledButton] = useState(true);

    const [getCreateNewAccount, setCreateNewAccount] = useState(false);
	const [getForgotPassword, setForgotPassword] = useState(false);

	const [getNonoAnimation, setNonoAnimation] = useState(false);

	const userContext = useUser();
	const formRef = useRef(null);

	useEffect( () => {
		formRef.current.addEventListener('animationend', () => setNonoAnimation(false));
	}, []);

    useEffect( () => {

        if(getCreateNewAccount){
            if(
                getName.length > 3 &&
				getEmail.length > 7 &&
				formatCpf(getCpf).valid &&
                getPassword.length > 5 &&
                getConfirmPassword == getPassword 
            ){
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        } else {
            if(
                getEmail.length > 8 &&
                getPassword.length > 5
            ){
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        }

    }, [getName, getEmail, getCpf, getPassword, getConfirmPassword]);

    async function onSubmit(event: FormEvent){

        event.preventDefault();

        if(getCreateNewAccount){

            userContext.createUser(getName, getEmail, getCpf, getPassword);

        } else {

            const result = await userContext.logIn(getEmail, getPassword);
			
			if(!result) alert('Erro ao logar');
			
			setNonoAnimation(true);
        }
	}
	
	function handleSetCpf(event: React.ChangeEvent<HTMLInputElement>){

		const formatedCpf = formatCpf(event.target.value).cpf;

		setCpf(formatedCpf);
	}

    return (
        <Container>
			<div className='modal-content'>

				<div className="modal-head">
					<h1>{(getCreateNewAccount) ? 'Cadastrar' : (getForgotPassword) ? 'Recuperar' : 'Login'}</h1>
					<button 
						type='button' 
						className='close-modal'
						onClick={() => userContext.handleSwitchModal()}
					>
						X
					</button>
				</div>

				{(getForgotPassword)
					? <ForgotPasswordModal setForgotPassword={setForgotPassword} />    
					: (
						<>
							<form 
								ref={formRef} 
								className={`${getNonoAnimation ? 'nono-animation' : ''}`}
								onSubmit={onSubmit}
							>
								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-name">Nome completo</label>
										<input 
											type='text' 
											id="login-name"
											value={getName}
											onChange={(event) => setName(event.target.value)}
										/>
									</div>
								)}

								<div className="input-group">
									<label htmlFor="login-email">e-mail</label>
									<input 
										type='email' 
										id="login-email"
										value={getEmail}
										onChange={(event) => setEmail(event.target.value.trim())}
									/>
								</div>
								
								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-cpf">CPF</label>
										<input 
											type='text' 
											id="login-cpf"
											maxLength={14}
											value={getCpf}
											onChange={handleSetCpf}
										/>
									</div>
								)}

								<div className="input-group">
									<label htmlFor="login-password">
										Senha {(getCreateNewAccount) && <span>(no mínimo 6 dígitos)</span>}
									</label>
									<input 
										type='password' 
										id="login-password"
										value={getPassword}
										onChange={(event) => setPassword(event.target.value.trim())}
									/>
								</div>

								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-confirm-password">Confirmar senha</label>
										<input 
											type='password' 
											id="login-confirm-password"
											value={getConfirmPassword}
											onChange={(event) => setConfirmPassword(event.target.value.trim())}
										/>
									</div>
								)}

								<button 
									type="submit" 
									className='login-button'
									disabled={getDisabledButton}
								>
									{(getCreateNewAccount) ? 'Cadastrar' : 'Entrar'}
								</button>

							</form>

							<div className='create-forgot'>
								{(getCreateNewAccount == false) && (
									<>
										<a 
											onClick={() => setCreateNewAccount(true)}
										>
											Criar nova conta
										</a> 
										<a
											onClick={() => setForgotPassword(true)}
										>
											Esqueci a senha
										</a>
									</>
								)}

								{(getCreateNewAccount) && (
									<>
										<a 
											onClick={() => setCreateNewAccount(false)}
										>
											Voltar para Login
										</a> 
									</>
								)}
							</div>
						</>
					)
				}
			</div>
		</Container>
	);
}

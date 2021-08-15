import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Loader from 'react-loader-spinner';

import formatCpf from '../../../../utils/formatCpf';
import { useUser } from '../../../../contexts/userContext';
import ForgotPasswordModal from '../../../forgotPassComponents/ForgotPasswordModal';

import { Container } from './styles';

export default function LoginModal() {

	const [getName, setName] = useState('');
	
	const [getCpf, setCpf] = useState('');
	
	const [getConfirmPassword, setConfirmPassword] = useState('');

	const [getDisabledButton, setDisabledButton] = useState(true);
	const [getIsfetching, setIsfetching] = useState(false);

	const [getCreateNewAccount, setCreateNewAccount] = useState(false);
	const [getForgotPassword, setForgotPassword] = useState(false);

	const [getNonoAnimation, setNonoAnimation] = useState(false);

	const userContext = useUser();
	const formRef = useRef(null);

	useEffect(() => {
		formRef.current.addEventListener('animationend', () => setNonoAnimation(false));
	}, []);

	useEffect(() => {

		if (getCreateNewAccount) {
			if (
				getName.length > 3 &&
				getEmail.length > 7 &&
				formatCpf(getCpf).valid &&
				getPassword.length > 5 &&
				getConfirmPassword == getPassword
			) {
				setDisabledButton(false);
			} else {
				setDisabledButton(true);
			}
		} else {
			if (
				getEmail.length > 7 &&
				getPassword.length > 5
			) {
				setDisabledButton(false);
			} else {
				setDisabledButton(true);
			}
		}

	}, [getName, getEmail, getCpf, getPassword, getConfirmPassword]);

	async function onSubmit(event: FormEvent) {

		event.preventDefault();

		if (getDisabledButton || getIsfetching) return;

		if (getCreateNewAccount) {

			setIsfetching(true);
			const result = await userContext.createUser(getName, getEmail, getCpf, getPassword);

			if (result == false) setIsfetching(false);

		} 
	}

	function handleSetCpf(event: React.ChangeEvent<HTMLInputElement>) {

		const formatedCpf = formatCpf(event.target.value).cpf;

		setCpf(formatedCpf);
	}

	return (
		<Container data-testid='login-modal'>
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
											data-testid="login-name"
											value={getName}
											onChange={(event) => setName(event.target.value)}
										/>
									</div>
								)}

								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-cpf">CPF</label>
										<input
											type='text'
											id="login-cpf"
											data-testid="login-cpf"
											maxLength={14}
											className={`${formatCpf(getCpf).valid == false ? 'invalid' : ''}`}
											value={getCpf}
											onChange={handleSetCpf}
										/>
									</div>
								)}

								

								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-confirm-password">Confirmar senha</label>
										<input
											type='password'
											id="login-confirm-password"
											data-testid="login-confirm-password"
											value={getConfirmPassword}
											onChange={(event) => setConfirmPassword(event.target.value.trim())}
										/>
									</div>
								)}

								<button
									type="submit"
									className={`login-button ${(getIsfetching) && 'is-fetching'}`}
									data-testid='login-button'
									disabled={getDisabledButton || getIsfetching}
								>
									{(getIsfetching)
										? (
											<Loader
												type="TailSpin"
												color="#0D2235"
												height={30}
												width={30}
											/>
										)
										: (getCreateNewAccount)
											? 'Cadastrar'
											: 'Entrar'
									}
								</button>

							</form>

							<div className='create-forgot'>
								{(getCreateNewAccount == false) && (
									<>
										<a
											onClick={() => setCreateNewAccount(true)}
											data-testid='create-new-account'
										>
											Criar nova conta
										</a>
										<a
											onClick={() => setForgotPassword(true)}
											data-testid='forgot-password'
										>
											Esqueci a senha
										</a>
									</>
								)}

								{(getCreateNewAccount) && (
									<>
										<a
											onClick={() => setCreateNewAccount(false)}
											data-testid='back-to-login'
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

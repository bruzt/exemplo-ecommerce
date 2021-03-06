import React, { useState, useEffect, FormEvent } from 'react';
import Loading from 'react-loader-spinner';

import api from '../../../services/api';

import { Container } from './styles';

interface IProps {
	setForgotPassword: React.Dispatch<boolean>;
}

export default function ForgotPasswordModal({ setForgotPassword }: IProps) {

	const [getEmail, setEmail] = useState('');

	const [getSendingEmail, setSendingEmail] = useState(false);
	const [getEmailSended, setEmailSended] = useState(false);
	const [getDisabledSendButton, setDisabledSendButton] = useState(true);

	useEffect(() => {
		if (getEmail.length > 7) setDisabledSendButton(false);
		else setDisabledSendButton(true);
	}, [getEmail])

	async function handleSendButton(event: FormEvent) {

		event.preventDefault();

		setDisabledSendButton(true);
		setSendingEmail(true);

		try {

			await api.post('/reset-password', {
				email: getEmail
			});

			setEmailSended(true);

		} catch (error) {
			console.log(error);

			if (error.response.data.message == 'user not found') alert('e-mail não cadastrado');
			else alert('Erro ao enviar email');
			setSendingEmail(false);
			setDisabledSendButton(false);
		}
	}

	return (
		<Container>
			{(getEmailSended)
				? <p className='forgot-password'>Enviado, verifique seu e-mail para trocar a senha.</p>
				: (
					<div className='center'>
						<form 
							className='forgot-password'
							onSubmit={handleSendButton}
						>
							<label htmlFor="forgot-pass-input">e-mail cadastrado</label>
							<input
								type="email"
								id='forgot-pass-input'
								value={getEmail}
								onChange={(event) => setEmail(event.target.value)}
							/>

							<button
								type='submit'
								disabled={getDisabledSendButton}
							>
								{(getSendingEmail) ? (
									<Loading
										type="TailSpin"
										color='#0D2235'
										height={20}
										width={20}
									/>
								) : 'Enviar'}
							</button>

							<a
								onClick={() => setForgotPassword(false)}
							>
								Voltar para Login
                            </a>
						</form>
					</div>
				)
			}
		</Container>
	);
}
